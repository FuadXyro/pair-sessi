import {
    createCanvas,
    registerFont
} from 'canvas';
import {
    promises as fsPromises
} from 'fs';

import {
    createHash
} from "crypto"
import fetch from "node-fetch"
let Reg = /\|?(.*)([^\w\s])([0-9]*)$/i

let confirmation = {}
async function handler(m, {
    conn,
    text,
    usedPrefix,
    command
}) {
    if (confirmation[m.sender]) return m.reply('Kamu sedang meminta verifikasi!')
    let user = global.db.data.users[m.sender]
    if (user.registered === true) throw `[💬] Kamu sudah terdaftar\nMau daftar ulang? *${usedPrefix}unreg <SERIAL NUMBER>*`
    const umurRandom = Math.floor(Math.random() * 100) + 1;
    const formatSalah = `⚠️ Format salah\n\n✳️ Penggunaan perintah : *${usedPrefix + command} nama.umur*\n📌Contoh : *${usedPrefix + command}* ${m.name.split('\n')[0]}.${umurRandom}`
    if (!Reg.test(text)) throw formatSalah
    let [_, name, splitter, age] = text.match(Reg)
    if (!name) throw "Nama tidak boleh kosong (Alphanumeric)"
    if (!age) throw "Umur tidak boleh kosong (Angka)"
    age = parseInt(age)
    if (age > 30) throw "*Gak boleh!*,\nTua amat dah 🗿"
    if (age < 5) throw "*Gak boleh!*,\nBanyak pedo 🗿"
    if (user.name && user.name.trim() === name.trim()) throw "Nama sudah dipakai"

    let sn = createHash("md5").update(m.sender).digest("hex")
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.fromMe ? conn.user.jid : m.sender
    let cap = `*${htki} ᴜsᴇʀs ${htka}*
${dmenub} *sᴛᴀᴛᴜs:* ☑️ sᴜᴄᴄᴇssғᴜʟ
${dmenub} *ɴᴀᴍᴇ:* ${name}
${dmenub} *ᴀɢᴇ:* ${age} ʏᴇᴀʀs
${dmenub} *sɴ:* ${sn}
${dmenuf}

ᴅᴀᴛᴀ ᴜsᴇʀ ʏᴀɴɢ ᴛᴇʀsɪᴍᴘᴀɴ ᴅɪᴅᴀᴛᴀʙᴀsᴇ ʙᴏᴛ, ᴅɪᴊᴀᴍɪɴ ᴀᴍᴀɴ ᴛᴀɴᴘᴀ ᴛᴇʀsʜᴀʀᴇ (. ❛ ᴗ ❛.) ${cmenua}
`
    const json = await createOtpCanvas();

    let confirm = "💡 Reply pesan ini dengan mengetik kode OTP yang ada pada gambar!";
    
     let { key } = await conn.sendFile(m.chat, json.image, '', confirm, m)
    confirmation[m.sender] = {
        message: m,
        sender: m.sender,
        otp: json.otp,
        caption: cap,
        pesan: conn,
        age,
        user,
        name,
        key,
        timeout: setTimeout(() => (
        conn.sendMessage(m.chat, { delete: key }),
        delete confirmation[m.sender]
        ), 60 * 1000)
    }
}

handler.before = async m => {
    if (m.isBaileys) return
    if (!(m.sender in confirmation)) return
    if (!m.text) return
    let {
        timeout,
        otp,
        message,
        sender,
        pesan,
        caption,
        user,
        name,
        age,
        key
    } = confirmation[m.sender]
    if (m.id === message.id) return

    if (m.text == otp) {
        user.name = name.trim()
        user.age = age
        user.regTime = +new Date
        user.registered = true
        let benar = `✓ OTP Benar!\n${m.name.split('\n')[0]} telah di verifikasi!\n\n`
        pesan.sendFile(m.chat, fla.getRandom() + "VERIFIED", '', benar + caption, m)
        clearTimeout(timeout)
        pesan.sendMessage(m.chat, { delete: key })
        delete confirmation[sender]
    } else {
        m.reply(`✖️ OTP Salah!\n${m.name.split('\n')[0]} tidak di verifikasi!`)
        clearTimeout(timeout)
        pesan.sendMessage(m.chat, { delete: key })
        delete confirmation[sender]
    }
}

handler.help = ["captcha"].map(v => v + " <nama>.<umur>")
handler.tags = ["xp"]
handler.command = /^(captcha)$/i

export default handler

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}

function isNumber(x) {
    return !isNaN(x)
}

function generateRandomCharacter() {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    return characters[Math.floor(Math.random() * characters.length)];
}

async function createOtpCanvas() {
    const files = await fsPromises.readdir('./src/font/');
    const canvas = createCanvas(150, 50);
    const ctx = canvas.getContext('2d');
    const codetext = Array.from({
        length: 4
    }, generateRandomCharacter).join('');
    const randomFont = `./src/font/${files[Math.floor(Math.random() * files.length)]}`;
    registerFont(randomFont, {
        family: randomFont
    });

    ctx.fillStyle = '#27292b';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.textAlign = 'center';
    ctx.font = 'bold 20px Captcha';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.fillText(codetext, 75, 35, 140);

    return {
        image: canvas.toBuffer(),
        otp: codetext
    }
}