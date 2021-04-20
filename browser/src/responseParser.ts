import { BodyParser } from './bodyParser';

export const enum ParserStatus {
  WAITING_STATUS_LINE = 0,
  WAITING_STATUS_LINE_END = 1,
  WAITING_HEADER_NAME = 2,
  WAITING_HEADER_SPACE = 3,
  WAITING_HEADER_VALUE = 4,
  WAITING_HEADER_LINE_END = 5,
  WAITING_HEADER_BLOCK_END = 6,
  WAITING_BODY = 7,
}

export class ResponseParser {
  private currentStatus = ParserStatus.WAITING_STATUS_LINE;
  private statusLine = '';
  private headerName = '';
  private headerValue = '';

  headers = {};
  bodyParser: BodyParser;
  statusCode: number;
  statusText: string;

  get finished() {
    return this.bodyParser?.finished;
  }
  get content() {
    return this.bodyParser?.content.join('') ?? '';
  }

  receive(string: string) {
    let idx = 0;

    while (idx < string.length) {
      const char = string.charAt(idx);

      this.receiveChar(char);
      idx++;
    }
  }

  receiveChar(char: string) {
    switch (this.currentStatus) {
      case ParserStatus.WAITING_STATUS_LINE:
        if (char === '\r') {
          this.currentStatus = ParserStatus.WAITING_STATUS_LINE_END;
        } else if (char === '\n') {
          this.currentStatus = ParserStatus.WAITING_HEADER_NAME;
        } else {
          this.statusLine += char;
        }
        break;
      case ParserStatus.WAITING_STATUS_LINE_END:
        if (char === '\n') {
          this.currentStatus = ParserStatus.WAITING_HEADER_NAME;
          this.dealStatusLine();
        }
        break;
      case ParserStatus.WAITING_HEADER_NAME:
        if (char === ':') {
          this.currentStatus = ParserStatus.WAITING_HEADER_SPACE;
        } else if (char === '\r') {
          this.currentStatus = ParserStatus.WAITING_HEADER_BLOCK_END;
        } else {
          this.headerName += char;
        }
        break;
      case ParserStatus.WAITING_HEADER_SPACE:
        if (char === ' ') {
          this.currentStatus = ParserStatus.WAITING_HEADER_VALUE;
        }
        break;
      case ParserStatus.WAITING_HEADER_VALUE:
        if (char === '\r') {
          this.currentStatus = ParserStatus.WAITING_HEADER_LINE_END;
          this.headers[this.headerName] = this.headerValue;
          this.headerName = '';
          this.headerValue = '';
        } else {
          this.headerValue += char;
        }
        break;
      case ParserStatus.WAITING_HEADER_LINE_END:
        if (char === '\n') {
          this.currentStatus = ParserStatus.WAITING_HEADER_NAME;
        }
        break;
      case ParserStatus.WAITING_HEADER_BLOCK_END:
        if (char === '\n') {
          this.currentStatus = ParserStatus.WAITING_BODY;
          this.bodyParser = new BodyParser(this.headers);
        }
        break;
      case ParserStatus.WAITING_BODY:
        this.bodyParser.receiveChar(char);
        break;
      default:
        break;
    }
  }

  dealStatusLine() {
    const m = this.statusLine.split(' ');

    this.statusCode = +m[1];
    this.statusText = m[2];
  }
}
