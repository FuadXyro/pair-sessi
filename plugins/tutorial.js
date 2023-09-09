let handler = async (m, { conn, usedPrefix: _p, __dirname, args }) => {
let pp = 'https://telegra.ph/file/9b6acf4fa1ca3826bc35f.jpg'
let text = `

*📮 Command Termux:*
Command termux ${author}
⏬⏬⏬⏬⏬⏬⏬⏬⏬⏬⏬


🔴–¸ Ketik di *[TERMUX]*
1) $ pkg upgrade && pkg update
2) $ pkg install git -y
3) $ pkg install ffmpeg -y
4) $ pkg install imagemagick -y
5) $ pkg install nodejs -y
6) $ git clone (link sc github)
7) $ cd (nama file)
8) $ npm i
9) $ node .


⏫⏫⏫⏫⏫⏫⏫⏫⏫⏫⏫

🌸======== *PEMISAH* =========🌸
Ini hanya untuk tutorial lain ya, yg ga paham misal ada yg
gagal, make command di bawah ini


🔴–¸ *Untuk Sc nya cari sendiri, atau ketik . script*
6) $ termux-setup-storage
7) $ cd storage/(nama file yg kmu rename) Jika storage ga berfungsi
ganti menjadi _cd sdcard/_


🔴–¸ *Git*
1) $ pkg install git -y
2) $ pkg install ffmpeg -y
3) $ pkg install imagemagick -y
4) $ pkg install nodejs -y

🔴–¸ *Script*
5) $ git clone (link sc github)
6) $ cd (nama sc)

*🔴–¸ Penginstal :*
$ npm start
atau
$ npm i
$ npm i pm2 && pm2 start (sesuaikan sama sc kalian)
$ node .

[ 📣 Note : Tanda $ Ga Perlu Di Ketik ]

# pengen jadi bot ga ribet? gampang tinggal ketik .jadibot
`
await conn.reply(m.chat, text, m, { contextInfo: { mentionedJid: [m.sender], forwardingScore: 9999, isForwarded: true, externalAdReply: { mediaType: 1, mediaUrl: pp, title: ']=======❏ TUTORIAL ❏=======[', thumbnail: { url: pp }, thumbnailUrl: pp, sourceUrl: false, renderLargerThumbnail: true }}})
}
handler.help = ['cbb', 'carabuatbot', 'runbot']
handler.tags = ['info']
handler.command = /^(cbb|cararunbot|runbot)$/i
handler.private = false

export default handler