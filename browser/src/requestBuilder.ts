import { URL } from 'url';

import type { Headers } from './httpClient';

export class RequestBuilder {
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
