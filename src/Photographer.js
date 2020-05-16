import puppeteer from "puppeteer";

const Photographer = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setViewport({ width: 820, height: 428 });
  await page.goto(url);
  await page.screenshot({ path: "banner.png" });
  await browser.close();
};

export default Photographer;
