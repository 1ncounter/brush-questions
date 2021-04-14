import { HTTPRequest } from './src/httpClient';

const request = new HTTPRequest();
request.open('GET', 'http://localhost:3001');
request.send({
  name: 'abc',
});
