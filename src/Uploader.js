import fs from "fs";
import puppeteer from "puppeteer";
import Login from "./Login";

const Uploader = async (url, fileName) => {
  if (!fs.existsSync(fileName)) {
    throw new Error(`File does not exists ${fileName}`);
  }

  // Init crawler.
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setViewport({ width: 1366, height: 768 });
  await Login(page);
  await page.goto(url);
  // Upload file
  await page.hover("#headerArea");
  await page.click(".uiPopover button");
  await page.screenshot({ path: "debug.png" });
  await page.waitForSelector(".uiContextualLayer input[type='file']", { timeout: 2000 });
  const inputUploadHandle = await page.$(".uiContextualLayer input[type='file']");
  inputUploadHandle.uploadFile(fileName);

  // submit.
  await page.waitForSelector("#headerArea button[type='submit']");
  // eslint-disable-next-line no-undef
  await page.click("#headerArea button[type='submit']");
  // Wait for X seconds while the image is uploaded.
  await page.waitFor(4000);
  await page.screenshot({ path: "facebook-upload.png" });
  await browser.close();
};

export default Uploader;
