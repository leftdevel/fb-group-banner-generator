/* eslint-disable no-console */
import path from "path";
import fs from "fs";
import express from "express";
import nunjucks from "nunjucks";

const root = path.resolve(__dirname, "..");
const templatesDir = `${root}/templates`;
const imagesDir = `${root}/public/img`;

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    // eslint-disable-next-line no-param-reassign
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

const Painter = () => {
  const host = process.env.HOST || "127.0.0.1";
  const port = process.env.PORT || 8080;
  const app = express();

  nunjucks.configure(templatesDir, {
    autoescape: true,
    express: app,
  });

  app.set("view engine", "njk");
  app.use((req, res, next) => {
    console.log(req.url);
    next();
  });

  app.get("/", (req, res) => {
    fs.readdir(imagesDir, null, (err, files) => {
      if (err) {
        throw err;
      }

      if (files.length === 0) {
        throw new Error("No images found");
      }

      const images = files.map((file) => `/img/${file}`);

      res.render("banner", { images: shuffle(images) });
    });
  });

  app.use(express.static(`${root}/public`));

  const logging = () => {
    console.log("Server started", host, port);
    console.log("Root directory", root);
    console.log("Press Ctrl+C to exit...\n");
  };

  return app.listen(port, host, logging);
};

export default Painter;
