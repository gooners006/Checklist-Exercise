const http = require('http');
const fs = require('fs');
// create file
fs.writeFile(`${__dirname}/newFile.txt`, 'Hello There! <br>', (err) => {
  if (err) throw err;
  console.log('Saved!');
});
// update file
fs.appendFile(`${__dirname}/newFile.txt`, '\nGeneral Kenobi!', (err) => {
  if (err) throw err;
  console.log('Updated!');
});
// read file
http
  .createServer((request, response) => {
    fs.readFile(`${__dirname}/newFile.txt`, (err, data) => {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write(data);
      response.end();
    });
  })
  .listen(3000);
