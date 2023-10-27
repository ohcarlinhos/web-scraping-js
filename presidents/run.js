import rp from "request-promise";
import { load } from "cheerio";
import fs from "fs";

const wikiUrl = "https://pt.wikipedia.org";
const pageUrl = "/wiki/Lista_de_presidentes_do_Brasil";

(async () => {
  try {
    const html = await rp(wikiUrl + pageUrl);
    const $ = load(html);

    const list = $(`td > b > a`).toArray();

    const wikiUrls = [];

    for (const item of list) {
      wikiUrls.push(item.attribs.href);
    }

    const presidents = await Promise.all(
      wikiUrls.map((url) => getPresidentInfos(wikiUrl + url)),
    );
    fs.writeFileSync("presidents.json", JSON.stringify(presidents));
  } catch (err) {
    console.error(err);
  }
})();

const getPresidentInfos = async (url) => {
  const html = await rp(url);
  const $ = load(html);

  return {
    name: $(`#firstHeading`).text(),
    info: $(".infobox.infobox_v2 tr")
      .find("td")
      .toArray()
      .map((i) => $(i).text()),
  };
};
