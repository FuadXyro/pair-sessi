

// Perbaiki koding:
/* 
    Made by https://github.com/syahrularranger 
    Jangan dihapus kreditnya :)
*/
let timeout = 60000; // 60 detik dalam milidetik
let poin = 500; // Nilai poin awal yang dimiliki oleh pemain 
let poin_lose = -100; // Nilai poin yang hilang jika salah menebak jawaban 
let handler = async (m, { conn, usedPrefix }) => {
  conn.suit = conn.suit ? conn.suit : {}; // Inisialisasi objek suit jika belum ada 

  if (Object.values(conn.suit).find(room => room.id.startsWith("suit") && [room.p, room.p2].includes(m.sender))) throw "Selesaikan suit sebelumnya terlebih dahulu.";

  if (!m.mentionedJid[0]) return m.reply(`_Siapa yang ingin kamu tantang?_\nTag orangnya.. Contoh\n\n${usedPrefix}suit @${conn.user.jid.split('@')[0]}`, m.chat, { contextInfo: { mentionedJid: [conn.user.jid] } });

  if (Object.values(conn.suit).find(room => room.id.startsWith("suit") && [room