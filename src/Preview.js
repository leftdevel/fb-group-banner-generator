import http from "http";
import fs from "fs";

const Preview = (port = 9615) => {
  const index = fs.readFileSync("./index.html");

  const server = http
    .createServer((req, res) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(index);
    })
    .listen(port);

  return server;
};

export default Preview;
