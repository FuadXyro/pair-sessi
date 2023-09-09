import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix }) => {

  if (!text) throw `Contoh Penggunaan\n${usedPrefix}spamcall 628xxxxxxxx`

  let nomor = text.replace(/[^0-9]/gi, '').slice(2)

  if (!nomor.startsWith('8')) throw `Contoh Penggunaan\n${usedPrefix}spamcall 628xxxxxxxx`
  
  m.reply('Tunggu Sebentar...')

  let anu = await fetch(`https://api.lolhuman.xyz/api/callingcode/${text}?apikey=22d09d6044992d45b7edfc5e`).then(a => a.json())
  
  let spcall = `*Nomor* : ${text}\n\n${namebot} berhasil menlpon anda!`
  
  conn.reply(anu)
  conn.reply(m.chat, `${spcall}`.trim(), m)

  }

handler.help = ['spamcall <nomor>']

handler.tags = ['tools']

handler.command = /^(spamcall)$/i

handler.limit = true
handler.premium = true
handler.group = true

export default handler