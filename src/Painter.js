/* eslint-disable no-console */
import path from "path";
import fs from "fs";
import express from "express";
import nunjucks from "nunjucks";
import morgan from "morgan";

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

const readImages = (callback) => {
  fs.readdir(imagesDir, null, (err, files) => {
    if (err) {
      throw err;
    }

    if (files.length === 0) {
      throw new Error("No images found");
    }

    const images = files.map((file) => `/img/${file}`);
    callback(images);
  });
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
  app.use(morgan("combined"));

  app.get("/", (req, res) => {
    readImages((images) => res.render("banner", { images: shuffle(images) }));
  });

  app.use(express.static(`${root}/public`));

  return app.listen(port, host, () => {
    console.log("sever started");
    console.log("host", host);
    console.log("port", port);
  });
};

export default Painter;
