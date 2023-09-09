let handler = async (m, { conn, text, args, command }) => {
  conn.duel = conn.duel || [];
  if (args.length !== 0) {
    conn.duel.push(m.mentionedJid ? m.mentionedJid[0] : (args[0].replace(/[@ .+-]/g, '').replace(' ', '') + '@s.whatsapp.net'));
  }
  let who = conn.duel[0];
  let enemy = global.db.data.users[who];
  let user = global.db.data.users[m.sender];
  let count = args[1] && args[1].length > 0 ? Math.min(100, Math.max(parseInt(args[1]), 1)) : Math.min(1);
  let nama = await conn.getName(m.sender);

  let randomaku = Math.floor(Math.random() * 101);
  let randomkamu = Math.floor(Math.random() * 81);
  let Aku = randomaku * 1;
  let Kamu = randomkamu * 1;

  let __timers = new Date() - user.lastduel;
  let _timers = 300000 - __timers;
  let timers = clockString(_timers);

  try {
    if (/duel/.test(command)) {
      if (!who) return conn.reply(m.chat, 'Tag orang yang ingin diajak duel!', m);

      let pler = `@${m.sender.replace(/@.+/, '')} Mengajak duel ${args[0]}\n\nPilih Y Atau No`;
      let mentionedJid = [m.sender];

      if (new Date() - user.lastduel > 300000) {
        conn.reply(m.chat, pler, m, { mentions: conn.parseMention(mentionedJid) });
      } else {
        conn.reply(m.chat, `Kamu Sudah Berduel Tunggu hingga ${timers}`, m);
      }
    }

    if (/dya/.test(command)) {
      let kenal = !who.includes(m.sender);
      if (kenal) throw 'Lu siapa?\nkok ikut kut mau duel';
      user.lastduel = new Date() * 1;
      if (Aku > Kamu) {
        user.money -= 900;
        enemy.money += 900;
        delete conn.duel[m.sender];
        conn.reply(m.chat, `@${who.split('@')[0]} Menang Gelud🤼\n*Hadiah:*\n900 Money buat beli gorengan`, m);
      } else if (Aku < Kamu) {
        user.money += 450;
        enemy.money -= 450;
        delete conn.duel[m.sender];
        conn.reply(m.chat, `@${who.split('@')[0]} Kalah Gelud🤼\n*Hadiah:*\n450 money Mayan buat beli Limit`, m);
      } else {
        user.money += 250;
        enemy.money += 250;
        delete conn.duel[m.sender];
        conn.reply(m.chat, `@${who.split('@')[0]}\n *Seri*\n masing masing 250 Money`, m);
      }
    }

    if (/dno/.test(command)) {
      let kenal = !who.includes(m.sender);
      if (kenal) return conn.reply(m.chat, 'Lu siapa?\nkok ikut kut mau duel', m);
      conn.reply(m.chat, `@${who.split('@')[0]} Membatalkan Ajakan Duel`, m);
      delete conn.duel[m.sender];
    }
  } catch (e) {
    return m.reply(`${e}`);
  }
};

handler.help = ['duel @tag'];
handler.tags = ['rpg'];
handler.command = /^(duel|dya|dno)/i;
handler.group = true;

export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function clockString(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000);
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24;
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return ['\n' + d, ' *Days ☀️*\n ', h, ' *Hours 🕐*\n ', m, ' *Minute ⏰*\n ', s, ' *Second ⏱️* ']
    .map(v => v.toString().padStart(2, '0'))
    .join('');
}