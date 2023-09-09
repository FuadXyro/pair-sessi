let handler = async (m) => {
    let user = db.data.users[m.sender]
    let botol = global.wm
    let who = m.mentionedJid && m.mentionenJid ? m.mentionedJid : m.fromMe ? conn.user.jid : m.sender
    let mentionedJid = [m.sender]
    let username = conn.getName(who)
    let str = `*▸ Dosa* ${username} *:* _${user.warning} / 100_\nTobak ketik .maaf`
    conn.reply(str)
}
handler.help = [`cekdosa`]
handler.tag = [`fun`,`islam`,'cek']
handler.command = /^(cekdosa|dosa)$/i

export default handler