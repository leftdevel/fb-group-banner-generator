import http from "http";
import path from "path";
import fs from "fs";

const publicDir = path.join(__dirname, "..", "public");

const Painter = (port = 9615) => {
  const index = fs.readFileSync("./assets/index.html");

  const server = http
    .createServer((req, res) => {
      if (req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(index);
      } else if (req.url.match(".css$")) {
        const cssPath = path.join(publicDir, req.url);
        const fileStream = fs.createReadStream(cssPath, "UTF-8");
        res.writeHead(200, { "Content-Type": "text/css" });
        fileStream.pipe(res);
      } else if (req.url.match(".png$")) {
        const imagePath = path.join(publicDir, req.url);
        const fileStream = fs.createReadStream(imagePath);
        res.writeHead(200, { "Content-Type": "image/png" });
        fileStream.pipe(res);
      } else if (req.url.match(".jpg$")) {
        const imagePath = path.join(publicDir, req.url);
        const fileStream = fs.createReadStream(imagePath);
        res.writeHead(200, { "Content-Type": "image/jpeg" });
        fileStream.pipe(res);
      } else {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("No Page Found");
      }
    })
    .listen(port);

  return server;
};

export default Painter;
