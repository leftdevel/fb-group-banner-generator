const http = require("http");
const fs = require("fs");

const index = fs.readFileSync("index.html");

const server = http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(index);
  })
  .listen(9615);

setTimeout(() => {
  server.close();
}, 3000);
