import fs from "fs";
import puppeteer from "puppeteer";

const Photographer = async (url, fileName) => {
  if (fs.existsSync(fileName)) {
    fs.unlinkSync(fileName);
  }

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // double the desired size.
  page.setViewport({ width: 820 * 2, height: 428 * 2 });
  await page.goto(url);
  await page.screenshot({ path: fileName });
  await browser.close();
};

export default Photographer;
