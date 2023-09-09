import fetch from 'node-fetch'
let handler = async (m, { conn }) => {
  
let res = await fetch('https://api.zahwazein.xyz/islami/kisahmuslim?apikey=85345ee3d9de')
let pp = `await(await fetch(x.result.image)).buffer()`
    let x = await res.json()    
    await m.reply(`Wait..`)
    let ucp = `
${cmenub} judul : ${x.result.Judul}
${cmenuf}
Cerita : 
${x.result.Cerita} :

${namebot}`
 await conn.reply(m.chat, ucp, m, { contextInfo: { mentionedJid: [m.sender], forwardingScore: 9999, isForwarded: true, externalAdReply: { mediaType: 1, mediaUrl: pp, title: ']=======❏ KISAH MUSLIM ❏=======[', thumbnail: { url: pp }, thumbnailUrl: pp, sourceUrl: false, renderLargerThumbnail: true }}})
}
handler.help = ['kisahmuslim']
handler.tags = ['quran']
handler.command = /^kisahmuslim$/i


export default handler