import https from "https";
import dotenv from "dotenv";
import puppeteer from "puppeteer";
import fs from "fs";
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
const imgClasses = "_s0 _4ooo img"; // ["img", "_5_4e"];
// const maxPhotos = 10;

const download = async (url, destination) => new Promise((resolve, reject) => {
  const file = fs.createWriteStream(destination);

  https.get(url, (response) => {
    response.pipe(file);

    file.on("finish", () => {
      file.close(resolve(true));
    });
  }).on("error", (error) => {
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
  const images = await page.evaluate(() => Array.from(document.querySelectorAll(imgClasses), (e) => e.src));

  for (let i = 0; i < images.length; i += 1) {
    console.log(images[i]);
    download(images[i], `image-${i}.png`);
  }

  await page.screenshot({ path: "facebook.png" });
  await browser.close();
}

main();
