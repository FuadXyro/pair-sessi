let handler = async (m, {
    conn,
    text,
    command,
    isBotAdmin
}) => {
    if (!m.quoted) throw "Reply pesan yang ingin diedit"
    if (!text) throw "Tidak ada teks"
    if (!m.quoted.isBaileys) throw "Pesan tidak dikirim oleh bot!"
    
    try {
        await conn.sendMessage(m.chat, {
            text: text,
            edit: m.quoted.vM.key
        })
    } catch (e) {
        try {
            let edit = m.quoted.sender ? m.message.extendedTextMessage.contextInfo.participant : m.key.participant
            let bang = m.quoted.id ? m.message.extendedTextMessage.contextInfo.stanzaId : m.key.id
            await conn.sendMessage(m.chat, {
                text: text,
                edit: {
                    remoteJid: m.chat,
                    fromMe: false,
                    id: bang,
                    participant: edit
                }
            })

        } catch (e) {
            await m.reply(eror)
        }
    }
}
handler.help = ["edit teks ( Reply Pesan )"]
handler.tags = ["tools"]
handler.command = ["edit"]
handler.premium = false

export default handler

function checkTrue(input) {
  return input === false;
}