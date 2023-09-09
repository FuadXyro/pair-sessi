import { artimimpi } from '@bochilteam/scraper'
//let jimp = require('jimp')
let handler = async (m, { conn, text, args, usedPrefix, command }) => {
    //let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : ''
    if (!text) throw `Use example ${usedPrefix}${command} Bot`
    const result = await artimimpi(text)
    
await m.reply(m.chat, result, fgif)
}

handler.help = ['artimimpi'].map(v => v + ' <Apa>')
handler.tags = ['fun']
handler.command = /^(artimimpi)$/i

export default handler
