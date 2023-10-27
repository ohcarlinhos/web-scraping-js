import puppeteer from "puppeteer";
import { load } from "cheerio";

const url = "https://www.reddit.com";

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto(url);

    const html = await page.content();
    const $ = load(html);

    const listList = $("[slot=full-post-link]")
      .toArray()
      .map((i) => i.attribs.href);

    console.log(listList);

    await browser.close();
  } catch (err) {
    console.err(err);
  }
})();
