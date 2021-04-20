import { createServer } from 'http';

const server = createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('X-Foo', 'bar');
  res.setHeader('Transfer-Encoding', 'chunked');

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  const template =
    '<!doctype html>' +
    '<html dir="ltr" lang="zh">' +
    '<head>' +
    '<meta charset="utf-8">' +
    '<title>新标签页</title>' +
    '<style>' +
    'body {' +
    'background: #FFFFFF;' +
    'margin: 0;' +
    '}' +
    '#oneGoogleBar {' +
    'height: 56px;' +
    '}' +
    '#backgroundImage {' +
    'border: none;' +
    'height: 100%;' +
    'pointer-events: none;' +
    'position: fixed;' +
    'top: 0;' +
    'visibility: hidden;' +
    'width: 100%;' +
    '}' +
    '[show-background-image] #backgroundImage {' +
    'visibility: visible;' +
    '}' +
    '</style>' +
    '</head>' +
    '<body>' +
    '<div id="oneGoogleBar">123</div>' +
    '</body>' +
    '</html>';

  res.end(encodeURIComponent(template));
});

server.listen(3001, () => {
  console.log('server is running at 3001');
});
