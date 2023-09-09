import { getContentType } from '@adiwajshing/baileys'

export async function before(m) {
   if (m.key.remoteJid === 'status@broadcast') {
    let puks = getContentType(m.message)
    if (/protocolMessage/i.test(puks)) this.sendMessage(owner[0][0]+'@s.whatsapp.net', {text:'Status dari @'+m.key.participant.split('@')[0]+' Telah dihapus', mentions: [m.key.participant]}, {quoted: fkontak})
    if (/(imageMessage|videoMessage|extendedTextMessage)/i.test(puks)) {
					let keke = (puks == 'extendedTextMessage') ? `\nStory Teks Berisi : ${m.message.extendedTextMessage.text}` : (puks == 'imageMessage') ? `\nStory Gambar dengan Caption : ${m.message.imageMessage.caption}` : (puks == 'videoMessage') ? `\nStory Video dengan Caption : ${m.message.videoMessage.caption}` : '\nTidak diketahui cek saja langsung!!!'
				}
				this.readMessages([m.key])
    }
}
export const disable = false