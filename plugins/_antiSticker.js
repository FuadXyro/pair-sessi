/*
let handler = m => m

handler.before = function (m, { conn, isAdmin, isBotAdmin }) {
  if (m.isBaileys && m.fromMe) return true
  let chat = global.db.data.chats[m.chat]
  let sender = global.db.data.chats[m.sender]
  

  let isSticker = m.mtype
  if (chat.antiSticker && isSticker) {
    if(isSticker === "stickerMessage"){
      if (global.opts) {
        if (!isAdmin) {
          if (isBotAdmin) {
       this.sendMessage(m.chat, { delete: m.key }) 
          
        }             
        }
      }
    }
  }
  return true
}

export default handler
*/


/* By FuadXy */
export async function before(m, { isAdmin, isBotAdmin }) {
  if (m.isBaileys || !(m.mtype === "stickerMessage") || !global.db.data.chats[m.chat]?.antiSticker) return;

  const user = global.db.data.users[m.sender];
  user.warn += 1;
  user.banned = true;

  m.reply(`*Sticker Terdeteksi!* ( ! )\n${m.name} telah mengirimkan stiker yang tidak diizinkan.`);

  if (isAdmin || isBotAdmin) {
    const deleteMessage = { delete: { remoteJid: m.key.remoteJid, fromMe: false, id: m.key.id, participant: [m.sender] } };
    m.reply(isAdmin ? '✘ *Kamu tidak diizinkan mengirim stiker.*' : '✘ *Stiker terdeteksi dan akan dihapus.*');
    await this.sendMessage(m.chat, deleteMessage);
  }
}

