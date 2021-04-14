import { createServer } from 'http';

const server = createServer((req, res) => {
  console.log('request content =========');
  console.log(req.headers);

  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('X-Foo', 'bar');
  res.end('ok');
});

server.listen(3001, () => {
  console.log('server is running at 3001');
});
