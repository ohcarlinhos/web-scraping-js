import rp from "request-promise";
import { load } from "cheerio";
import fs from "fs";

import getPresidentInfos from "./getPresidentInfos.js";

const wikiUrl = "https://pt.wikipedia.org";
const pageUrl = "/wiki/Lista_de_presidentes_do_Brasil";

rp(wikiUrl + pageUrl)
  .then((html) => {
    const $ = load(html);
    const list = $(`td > b > a`).toArray();

    const wikiUrls = [];

    for (const item of list) {
      wikiUrls.push(item.attribs.href);
    }

    return Promise.all(wikiUrls.map((url) => getPresidentInfos(wikiUrl + url)));
  })
  .then((p) => {
      fs.writeFileSync("presidents.json", JSON.stringify(p));
  })
  .catch((err) => {
    console.log(err);
  });
