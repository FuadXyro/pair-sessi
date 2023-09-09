import fs from 'fs';
import fetch from 'node-fetch';
import moment from 'moment-timezone';

const handler = async (m, { conn, args, command }) => {
  let _muptime;
  if (process.send) {
    process.send('uptime');
    _muptime = await new Promise(resolve => {
      process.once('message', resolve);
      setTimeout(resolve, 1000);
    });
    _muptime *= 1000;
  }
  let muptime = clockString(_muptime);
let totalf = Object.values(global.plugins).filter(
    (v) => v.help && v.tags
  ).length;

  let upt = `
     ◉ s ᴛ ᴀ ᴛ ᴜ s ◉
  ~ʀᴜɴᴛɪᴍᴇ: ${muptime}
  ~ᴍᴇᴍᴏʀʏ ᴜsᴇᴅ: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB
  ~sɪᴢᴇ ᴅᴀᴛᴀʙᴀsᴇ: ${megabit()} MB
  ~ɴᴏᴅᴇᴊs: ${process.version} `;
  let mentionedJid = [m.sender];
  let res = `https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=amped-logo&doScale=true&scaleWidth=800&scaleHeight=500&text=${muptime}`;
  conn.sendFile(m.chat, res, 'puad.jpg', upt, m, false);
};

handler.tags = ['info']
handler.help = ['runtime'];
handler.command = ['runtime', 'rt'];

export default handler;

function ucapan() {
  const time = moment.tz('Asia/Jakarta').format('HH');
  let res = 'Sudah Dini Hari Kok Belum Tidur Kak? 🥱';
  if (time >= 4) {
    res = 'Pagi Lord 🌄';
  }
  if (time >= 10) {
    res = 'Selamat Siang Kak ☀️';
  }
  if (time >= 15) {
    res = 'Selamat Sore Kak 🌇';
  }
  if (time >= 18) {
    res = 'Malam Kak 🌙';
  }
  return res;
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [h, ' H ', m, ' M ', s, ' S '].map(v => v.toString().padStart(2, '0')).join('');
}

function megabit() {
    let stats = fs.statSync("database.json")
    let ukuran_mb = stats.size / (1024*1024)
    return ukuran_mb.toFixed(1)
    }