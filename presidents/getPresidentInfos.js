import rp from "request-promise";
import { load } from "cheerio";

const getPresidentInfos = async (url) => {
  return rp(url)
    .then((html) => {
      const $ = load(html);

      return {
        name: $(`#firstHeading`).text(),
        info: $(".infobox.infobox_v2 tr")
          .find("td")
          .toArray()
          .map((i) => $(i).text()),
      };
    })
    .catch((err) => {
      console.error(err);
    });
};

export default getPresidentInfos;
