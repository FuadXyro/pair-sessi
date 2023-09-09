import fetch from 'node-fetch'

const startAkinatorSession = async (m, aki) => {
  try {
    const res = await fetch(`https://api.lolhuman.xyz/api/akinator/start?apikey=e1a815979e6adfc071b7eafc`)
    const anu = await res.json()
    if (anu.status !== 200) {
      throw new Error('Akinator API returned an error')
    }

    const { server, frontaddr, session, signature, question, progression, step } = anu.result
    aki.sesi = true
    aki.server = server
    aki.frontaddr = frontaddr
    aki.session = session
    aki.signature = signature
    aki.question = question
    aki.progression = progression
    aki.step = step

    const txt = `🎮 *Akinator* 🎮\n\n@${m.sender.split('@')[0]}\n${question}\n\n`
    txt += '0 - Ya\n'
    txt += '1 - Tidak\n'
    txt += '2 - Saya Tidak Tau\n'
    txt += '3 - Mungkin\n'
    txt += '4 - Mungkin Tidak\n\n'
    txt += `*${usedPrefix + command} end* untuk keluar dari sesi Akinator`

    const soal = await conn.sendMessage(m.chat, { text: txt, mentions: [m.sender] }, { quoted: m })
    aki.soal = soal
  } catch (e) {
    console.error('Akinator API error:', e)
    m.reply('Terjadi kesalahan saat memulai sesi Akinator.')
  }
}

const handler = async (m, { conn, usedPrefix, command, text }) => {
  if (global.db.data.chats[m.chat].game == false && m.isGroup) {
    return conn.reply(
      m.chat,
      "Game Tidak Aktif Di Chat Ini\n\nSilahkan Ketik .on game\nUntuk Mengaktifkan Game ",
      fkontak
    )
  }

  if (m.isGroup) {
    return
  }

  const aki = global.db.data.users[m.sender].akinator

  if (text == 'end') {
    if (!aki.sesi) {
      return m.reply('Anda tidak sedang dalam sesi Akinator')
    }

    aki.sesi = false
    aki.soal = null
    m.reply('Berhasil keluar dari sesi Akinator.')
  } else {
    if (aki.sesi) {
      return conn.reply(m.chat, 'Anda masih berada dalam sesi Akinator', aki.soal)
    }

    await startAkinatorSession(m, aki)
  }
}

handler.menu = ['akinator']
handler.tags = ['game']
handler.command = /^(akinator)$/i
handler.limit = true

export default handler