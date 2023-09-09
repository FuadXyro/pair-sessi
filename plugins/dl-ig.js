/** JANGAN DIHAPUS KONTOL
  * Update To Url by FuadXy
  * Github: https://github.com/FuadBoTz-MD
  * WhatsApp: wa.me/6283837709331
  * Jangan Dijual Ya Ajg
**/

import fetch from "node-fetch";
import got from "got";
import cheerio from "cheerio";
import { instagram } from "@xct007/frieren-scraper";

let handler = async (m, { command, usedPrefix, conn, text, args }) => {
  try {
    if (!text) return m.reply("Input query link");
    m.reply("Please wait...");

    let results = await (await fetch("https://fantox001-scrappy-api.vercel.app/instadl?url=" + text)).json();

    let caption = `*[ I N S T A G R A M ]*`;
    let out = results.videoUrl;

    await m.reply("Please wait...");
    await conn.sendFile(m.chat, out, "", caption, m);
  } catch (e) {
    await m.reply("Error occurred");
  }
};

handler.help = ['instagram'];
handler.tags = ['downloader'];
handler.command = /^(ig(dl)?|instagram(dl)?)$/i;

export default handler;

async function igDownload(url) {
  return await got(url)
    .then(response => {
      const $ = cheerio.load(response.body);
      const metaTags = $('meta[property="og:video:secure_url"]').attr('content');
      return metaTags;
    });
}