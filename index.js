import https from "https";
import dotenv from "dotenv";
import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
// import Preview from "./src/Preview";

dotenv.config();

// const server = Preview();

// setTimeout(() => {
//   server.close();
// }, 3000);

const username = process.env.USERNAME;
const pass = process.env.PASS;
const siteUrl = "https://www.facebook.com/";
const usernameSelector = "#email";
const passSelector = "#pass";
const submitSelector = "#login_form input[type='submit']";
// https://www.facebook.com/groups/197973700229538/insights/?section=members
const groupUrl = "https://www.facebook.com/groups/197973700229538/members/";
const imgClasses = "img._s0._4ooo.img"; // ["img", "_5_4e"];
const maxPhotos = 10;
const destinationDir = "public";

const download = async (url, destination) => new Promise((resolve, reject) => {
  const file = fs.createWriteStream(destination);

  return https
    .get(url, (response) => {
      response.pipe(file);

      file.on("finish", () => {
        file.close(resolve(file));
      });
    })
    .on("error", (error) => {
      fs.unlink(destination);
      reject(error.message);
    });
});

async function main() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setViewport({ width: 1366, height: 768 });
  await page.goto(siteUrl);
  await page.click(usernameSelector);
  await page.keyboard.type(username);
  await page.click(passSelector);
  await page.keyboard.type(pass);
  await page.click(submitSelector);
  await page.waitForNavigation();
  await page.goto(groupUrl);
  const images = await page.evaluate(
    (selector) => Array.from(document.querySelectorAll(selector), (e) => e.src),
    imgClasses,
  );

  const totalPhotos = Math.min(images.length, maxPhotos);

  for (let i = 0; i < totalPhotos; i += 1) {
    download(images[i], path.join([__dirname, destinationDir, `image-${i}.jpg`])).catch((err) => console.log(err));
  }

  await page.screenshot({ path: "facebook.png" });
  await browser.close();
}

main();
