import moment from 'moment-timezone';

export async function before(m) {
    if (m.chat.endsWith('broadcast') || m.fromMe || m.isGroup) return

    const time = moment.tz('Asia/Jakarta').format('HH')
    let res = "Selamat dinihari 🌆"
    if (time >= 4) {
        res = "Selamat pagi 🌄"
    }
    if (time > 10) {
        res = "Selamat siang ☀️"
    }
    if (time >= 15) {
        res = "Selamat sore 🌇"
    }
    if (time >= 18) {
        res = "Selamat malam 🌙"
    }

    let user = global.db.data.users[m.sender]
    let txt = `👋 Hai ${m.name}, ${res}

${user.banned ? '📮Maaf, kamu dibanned & Tidak bisa menggunakan bot ini lagi' : `💬 Ada yg bisa ${this.user.name} bantu?\nSilahkan ketik .menu untuk melihat daftar menu pada bot.\n\nNote: ᴅᴀᴛᴀʙᴀsᴇ ʙᴏᴛ ʙɪsᴀ sᴀᴊᴀ ᴋᴇʀᴇsᴇᴛ ᴋᴀʀᴇɴᴀ ᴘʟᴀᴛғʀᴏᴍɴʏᴀ..\nsᴜᴘᴘᴏʀᴛ ʙᴏᴛ ɪɴɪ ᴅᴇɴɢᴀɴ ᴄᴀʀᴀ ʙᴇʀᴅᴏɴᴀsɪ/sᴇᴡᴀ ʙᴏᴛ ᴀɢᴀʀ ʙᴏᴛ ɪɴɪ ʙɪsᴀ ᴏɴ ²⁴ ᴊᴀᴍ ᴅᴀɴ ᴅᴀᴛᴀʙᴀsᴇ ᴛɪᴅᴀᴋ ᴀᴋᴀɴ ᴋᴇʀᴇsᴇʀ.\n\nᴛʀɪᴍᴀ ᴋᴀsɪʜ🙏`}`.trim()

    if (new Date() - user.pc < 21600000) return // waktu ori 21600000 (6 jam)
    conn.relayMessage(m.chat,  { scheduledCallCreationMessage: {
	callType: 'VIDEO',
	scheduledTimestampMs: 0,
	title: txt}
	}, {})
    user.pc = new Date * 1
}