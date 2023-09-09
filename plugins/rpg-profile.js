import { join } from 'path';
import { xpRange } from '../lib/levelling.js';
import canvafy from "canvafy";

const checkUser = (id, adminList) => {
  const admin = adminList.find((participant) => participant.id === id)?.admin;
  return admin === 'superadmin' ? 'Super Admin' : admin === 'admin' ? 'Admin' : 'Member';
};

const potongString = (str) => str.length <= 80 ? str : str.slice(0, 80);

async function profileImage(url, hasilPotong) {
  const profileBuffer = await new canvafy.WelcomeLeave()
    .setAvatar(url)
    .setBackground("image", "https://th.bing.com/th/id/R.248b992f15fb255621fa51ee0ca0cecb?rik=K8hIsVFACWQ8%2fw&pid=ImgRaw&r=0")
    .setTitle("PROFILE")
    .setDescription(hasilPotong)
    .setBorder("#2a2e35")
    .setAvatarBorder("#2a2e35")
    .setOverlayOpacity(0.3)
    .build();
  return profileBuffer;
}

let handler = async (m, { conn, args, usedPrefix, command, groupMetadata }) => {
  const adminList = groupMetadata.participants; // Perbaikan ini!
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  let { exp, limit, level, role, money, lastclaim, lastweekly, registered, regTime, age, banned, pasangan } = global.db.data.users[who];
  let { min, xp, max } = xpRange(level, global.multiplier);
  let name = m.name.split("\n")[0];
  let pp = await conn.profilePictureUrl(who).catch(_ => './src/avatar_contact.png');
  if (typeof global.db.data.users[who] == "undefined") {
    global.db.data.users[who] = {
      exp: 0,
      limit: 10,
      lastclaim: 0,
      registered: false,
      name: conn.getName(m.sender),
      age: -1,
      regTime: -1,
      afk: -1,
      afkReason: '',
      banned: false,
      level: 0,
      lastweekly: 0,
      role: 'Warrior V',
      autolevelup: false,
      money: 0,
      pasangan: "",
    };
  }
  let math = max - xp;
  let caption = `*PROFILE RAMPAGE*
*👤 Nama:* *(${name})* 
*🏷️ Tags* (@${who.split("@")[0]} )
*❤️ Pasangan:*  ${pasangan ? `@${pasangan.split("@")[0]}` : `Tidak Punya`}
*💲 Money:* *RP* ${money}
*🏆 Level* ${level}
*🎋 Role:* ${role}
*🧬 XP:* TOTAL ${exp}\n (${exp - min} / ${xp}) [${math <= 0 ? `Siap untuk *${usedPrefix}levelup*` : `${math} XP lagi untuk levelup`}]
*📨 Terdaftar:* ${registered ? '✓ (' + new Date(regTime).toLocaleString() + ')' : 'Tidak'} ${lastclaim > 0 ? '\n*⏱️Terakhir Klaim:* ' + new Date(lastclaim).toLocaleString() : ''}\n\n Ketik ${usedPrefix}inv untuk melihat Inventory RPG`;

  const contohStringPanjang = `Ini adalah profil dari ${name}, seorang ${checkUser(m.sender, adminList)} di ${groupMetadata.subject}.`; // Perbaikan ini!
  const hasilPotong = potongString(contohStringPanjang);
  const url = await conn.profilePictureUrl(who, 'image');
  const profileBuffer = await profileImage(url, hasilPotong);
  try {
    await conn.sendFile(m.chat, profileBuffer, '', caption, m, null, { mentions: conn.parseMention(caption) });
  } catch (e) {
    await conn.sendFile(m.chat, pp, '', caption, m, null, { mentions: conn.parseMention(caption) });
  }
};

handler.help = ['rpg'].map(v => v + ' <url>');
handler.tags = ['rpg'];
handler.command = /^(rpg)$/i;
handler.group = true

export default handler;