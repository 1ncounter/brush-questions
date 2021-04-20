import type { Headers } from './httpClient';

export interface Parser {
  finished: boolean;
  content: string[];

  receive?(body: string): string;
  receiveChar?(char: string): void;
}

export class BodyParser {
  parser: Parser;

  constructor(headers: Headers) {
    if (headers['Transfer-Encoding'] === 'chunked') {
      this.parser = new TrunkedBodyParser();
    }
  }

  get finished() {
    return this.parser.finished;
  }
  get content() {
    return this.parser.content;
  }

  receive(body: string) {
    if (this.parser.receive) this.parser.receive(body);
  }

  receiveChar(char: string) {
    if (this.parser.receiveChar) this.parser.receiveChar(char);
  }
}

enum TrunkedParserStatus {
  WATIING_LENGTH = 0,
  WATIING_LENGTH_END = 1,
  WAITING_CONTENT = 2,
  WAITING_CONTENT_WRAP_END = 3,
  WAITING_CONTENT_END = 4,
}

/**
 * 在每一个分块的开头需要添加当前分块的长度，以十六进制的形式表示，
 * 后面紧跟着 '\r\n' ，之后是分块本身，后面也是'\r\n' 。
 * 终止块是一个常规的分块，不同之处在于其长度为0。
 * 终止块后面是一个挂载（trailer），由一系列（或者为空）的实体消息首部构成。
 */
export class TrunkedBodyParser implements Parser {
  private length = 0;
  private currentStatus = TrunkedParserStatus.WATIING_LENGTH;

  finished = false;
  content: string[] = [];

  receiveChar(char: string) {
    switch (this.currentStatus) {
      case TrunkedParserStatus.WATIING_LENGTH:
        if (char === '\r') {
          this.currentStatus = TrunkedParserStatus.WATIING_LENGTH_END;
        } else {
          this.length = this.length * 16;
          this.length += parseInt(char, 16);
        }
        break;
      case TrunkedParserStatus.WATIING_LENGTH_END:
        if (char === '\n') {
          if (this.length === 0) {
            this.finished = true;
          } else {
            this.currentStatus = TrunkedParserStatus.WAITING_CONTENT;
          }
        }
        break;
      case TrunkedParserStatus.WAITING_CONTENT:
        this.content.push(char);
        this.length--;
        if (this.length === 0) {
          this.currentStatus = TrunkedParserStatus.WAITING_CONTENT_WRAP_END;
        }
        break;
      case TrunkedParserStatus.WAITING_CONTENT_WRAP_END:
        if (char === '\r') {
          this.currentStatus = TrunkedParserStatus.WAITING_CONTENT_END;
        }
        break;
      case TrunkedParserStatus.WAITING_CONTENT_END:
        if (char === '\n') {
          this.currentStatus = TrunkedParserStatus.WATIING_LENGTH;
        }
        break;
      default:
        break;
    }
  }
}
