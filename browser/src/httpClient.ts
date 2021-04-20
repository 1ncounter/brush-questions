import { createConnection, Socket } from 'net';
import { EventEmitter } from 'events';
import { STATUS_CODES } from 'http';
import { RequestBuilder } from './requestBuilder';
import { ResponseParser } from './responseParser';

export interface Headers {
  [name: string]: string | number;
}

const enum HTTPRequestState {
  UNSENT = 0,
  OPENED = 1,
  HEADERS_RECEIVED = 2,
  LOADING = 3,
  DONE = 4,
}

export class HTTPRequest extends EventEmitter {
  static UNSENT = HTTPRequestState.UNSENT;
  static OPENED = HTTPRequestState.OPENED;
  static HEADERS_RECEIVED = HTTPRequestState.HEADERS_RECEIVED;
  static LOADING = HTTPRequestState.LOADING;
  static DONE = HTTPRequestState.DONE;

  _readyState: HTTPRequestState = HTTPRequestState.UNSENT;

  connection: Socket = null;
  requestBuilder: RequestBuilder;
  responseParser: ResponseParser;

  status: number = 200;
  statusText: string = STATUS_CODES[this.status];

  responseType = '';
  responseURL: string = '';
  responseText: string = '';
  responseHeaders: Headers = {};

  /**
   * 代表着一个请求在被自动终止前所消耗的毫秒数。默认值为 0，意味着没有超时。
   */
  timeout: number = 0;

  /**
   * 它指示了是否该使用类似cookies,authorization headers(头部授权)
   * 或者TLS客户端证书这一类资格证书来创建一个跨站点访问控制（cross-site Access-Control）请求。
   */
  withCredentials: boolean = false;

  /**
   * 会在 readyState 属性发生改变时被调用。
   */
  onreadystatechange: Function = () => {};

  constructor() {
    super();

    this.requestBuilder = new RequestBuilder();
    this.responseParser = new ResponseParser();
  }

  get readyState() {
    return this._readyState;
  }

  setRequestHeader(name: string, content: string) {
    this.requestBuilder.header(name, content);
  }
  overrideMimeType(mimeType: string) {
    this.requestBuilder.header('Content-Type', mimeType);
  }

  getResponseHeader(name: string) {
    return this.responseHeaders[name];
  }
  getAllResponseHeaders() {
    return this.responseHeaders;
  }

  writeSocket(body?: Record<string, any>) {
    const { url, writeTemplate } = this.requestBuilder.body(body).build();

    if (this.connection) {
      this.connection.write(writeTemplate);
    } else {
      this.connection = createConnection(
        {
          host: url.hostname,
          port: parseInt(url.port) || 80,
        },
        () => {
          this.connection.write(writeTemplate);
        }
      );
    }

    this.connection.on('data', (data) => {
      this.responseParser.receive(data.toString('utf-8'));

      if (this.responseParser.finished) {
        this.status = this.responseParser.statusCode;
        this.responseText = decodeURIComponent(this.responseParser.content);
        this.responseHeaders = this.responseParser.headers;
      }

      this.connection.end();

      this.emit('load');
    });

    this.connection.on('error', (error) => {
      this.emit('error', error);
    });
  }

  open(method: string, url: string) {
    this.requestBuilder.reset();
    this.requestBuilder.method(method).url(url);
  }

  send(body?: Record<string, any>) {
    this.writeSocket(body);
  }

  abort() {}
}
