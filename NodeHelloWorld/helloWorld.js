const http = require('http');

const hostName = 'localhost';
const port = 3000;

const server = http.createServer((request, respond) => {
  respond.writeHead(200, '{Content-Type,text/plain}');
  respond.write('Hello World!');
  respond.end();
});
server.listen(port, hostName, (error) => {
  if (error) {
    return error;
  }
  return `This ${port} port is working on the ${hostName}`;
});
