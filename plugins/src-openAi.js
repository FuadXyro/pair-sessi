import { Configuration, OpenAIApi } from "openai";
import fs from 'fs'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    
    let name = conn.getName(m.sender);
    let fkontak = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: `status@broadcast` } : {}) }, message: { 'contactMessage': { 'displayName': `${name}`, 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${wm},;;;\nFN:${wm},\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabell:Ponsel\nEND:VCARD`, 'jpegThumbnail': fs.readFileSync('./thumbnail.jpg'), thumbnail: fs.readFileSync('./thumbnail.jpg'),sendEphemeral: true}}};
    if (!text) throw `Contoh:\n${usedPrefix + command} Apa itu OpenAI`
    const configuration = new Configuration({
        apiKey: "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'" //api key bisa didapatkan dari https://openai.com/api/
    });
    const openai = new OpenAIApi(configuration);
            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: text,
                temperature: 0,
                max_tokens: 3000,
                top_p: 1,
                frequency_penalty: 0.5,
                presence_penalty: 0
            });
                conn.reply(m.chat, response.data.choices[0].text, fkontak)
}
handler.help = ['ai <pertanyaan>']
handler.tags = ['internet']
handler.command = /^(ai)$/i
handler.premium = true

export default handler

/**
 * 
 * By: Kyami ×͜×
 * Github: ShionMDv
 * 
 */