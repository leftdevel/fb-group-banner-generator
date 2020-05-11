import http from "http";
import path from "path";
import fs from "fs";

const Previewer = (port = 9615) => {
  const index = fs.readFileSync("./assets/index.html");

  const server = http
    .createServer((req, res) => {
      if (req.url === "/") {
        fs.readFile("./public/index.html", "UTF-8", (err, html) => {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(html);
        });
      } else if (req.url.match(".css$")) {
        const cssPath = path.join(__dirname, "public", req.url);
        const fileStream = fs.createReadStream(cssPath, "UTF-8");
        res.writeHead(200, { "Content-Type": "text/css" });
        fileStream.pipe(res);
      } else if (req.url.match(".png$")) {
        const imagePath = path.join(__dirname, "public", req.url);
        const fileStream = fs.createReadStream(imagePath);
        res.writeHead(200, { "Content-Type": "image/png" });
        fileStream.pipe(res);
      } else {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("No Page Found");
      }

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(index);
    })
    .listen(port);

  return server;
};

export default Previewer;
