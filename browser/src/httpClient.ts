import { createConnection, Socket } from 'net';
import { EventEmitter } from 'events';
import { STATUS_CODES } from 'http';
import { URL } from 'url';

interface Headers {
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
  requestOptsBuilder: RequestOptsBuilder;
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

    this.requestOptsBuilder = new RequestOptsBuilder();
    this.responseParser = new ResponseParser();
  }

  get readyState() {
    return this._readyState;
  }

  setRequestHeader(name: string, content: string) {
    this.requestOptsBuilder.header(name, content);
  }
  overrideMimeType(mimeType: string) {
    this.requestOptsBuilder.header('Content-Type', mimeType);
  }

  getResponseHeader(name: string) {
    return this.responseHeaders[name];
  }
  getAllResponseHeaders() {
    return this.responseHeaders;
  }

  writeSocket(body?: Record<string, any>) {
    const { url, writeTemplate } = this.requestOptsBuilder.body(body).build();

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
      const result = data.toString();
      this.connection.end();
    });

    this.connection.on('end', () => {
      this.emit('load');
    });

    this.connection.on('error', (error) => {
      this.emit('error', error);
    });
  }

  open(method: string, url: string) {
    this.requestOptsBuilder.reset();
    this.requestOptsBuilder.method(method).url(url);
  }

  send(body?: Record<string, any>) {
    this.writeSocket(body);
  }

  abort() {}
}

class RequestOptsBuilder {
  _method = 'GET';
  _url: string = '';
  _headers: Headers = {};
  _body: Record<string, any> = {};

  constructor() {
    this.reset();
  }

  reset() {
    this._method = 'GET';
    this._url = '';
    this._headers = {
      ['Content-Type']: 'application/x-www-form-unlencoded',
    };
    this._body = {};
  }
  build() {
    const url = this.parseUrl();
    const body = this.parseBody();
    const headers = this.parseHeader();

    const writeTemplate = `${this._method.toUpperCase()} / HTTP/1.1\r
${Object.entries(headers)
  .map(([key, value]) => `${key}: ${value}`)
  .join('\r\n')}\r\n
${body}\r
`;

    return {
      url,
      writeTemplate,
    };
  }

  method(method: string) {
    this._method = method;
    return this;
  }
  url(url: string) {
    this._url = url;
    return this;
  }
  header(name: string, content: string) {
    this._headers[name] = content;
    return this;
  }
  body(body: Record<string, any>) {
    if (body) this._body = body;
    return this;
  }

  private parseUrl() {
    const url = new URL(this._url);
    return url;
  }
  private parseHeader() {
    const headers = {};
    console.log(this._headers);
    Object.keys(this._headers).forEach((key) => {
      let value = this._headers[key];
      headers[key] = value;
    });

    return headers;
  }
  private parseBody() {
    let bodyText = '';
    const ContentType = this._headers['Content-Type'];

    if (ContentType === 'application/json') {
      bodyText = JSON.stringify(this._body);
    } else if (ContentType === 'application/x-www-form-unlencoded') {
      bodyText = Object.keys(this._body)
        .map((key) => `${key}=${encodeURIComponent(this._body[key])}`)
        .join('&');
    }

    this._headers['Content-Length'] = bodyText.length;

    return bodyText;
  }
}

class ResponseParser {}
