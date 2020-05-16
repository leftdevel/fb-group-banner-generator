import https from "https";
import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import FsUtils from "./FsUtils";

const siteUrl = "https://www.facebook.com/";
const usernameSelector = "#email";
const passSelector = "#pass";
const submitSelector = "#login_form input[type='submit']";
// https://www.facebook.com/groups/197973700229538/insights/?section=members
const groupUrl = "https://www.facebook.com/groups/197973700229538/members/";
const imgClasses = "img._s0._4ooo.img"; // ["img", "_5_4e"];
const maxPhotos = 10;
const destinationDir = "public/img";

const download = async (url, destination) => new Promise((resolve, reject) => {
  const file = fs.createWriteStream(destination);

  https
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

async function Scrapper() {
  const username = process.env.USERNAME;
  const pass = process.env.PASS;

  // clear photos destination dir
  FsUtils.prepareDistDir(destinationDir);
  // Run browser
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
    // eslint-disable-next-line no-undef
    (selector) => Array.from(document.querySelectorAll(selector), (e) => e.src),
    imgClasses,
  );

  const totalPhotos = Math.min(images.length, maxPhotos);
  const photos = [];
  const requests = [];

  for (let i = 0; i < totalPhotos; i += 1) {
    const destination = path.join(destinationDir, `image-${i}.jpg`);
    requests.push(download(images[i], destination));
    photos.push(destination);
  }

  Promise.all(requests).catch((err) => console.log(err));

  await page.screenshot({ path: "facebook.png" });
  await browser.close();

  return photos;
}

export default Scrapper;
