//Recode FuadXy
// let pajak = 0.02
let handler = async (m, { conn, text }) => {
let dapat = (Math.floor(Math.random() * 5000))
  let who
  if (m.isGroup) who = m.mentionedJid[0]
  else who = m.chat
  if (!who) throw 'Tag salah satu lah, yang kamu ingin berdagang bareng'
  let __timers = (new Date - global.db.data.users[m.sender].lastdagang)
  let _timers = (28800000 - __timers) 
  let timers = clockString(_timers)
  let users = global.db.data.users
  let username = conn.getName(who)
  if (new Date - global.db.data.users[m.sender].lastdagang > 28800000){
  if (4999 > users[who].money) throw 'Target tidak memiliki modal harap masukkan modal 5000'
  if (4999 > users[m.sender].money) throw 'kamu tidak memiliki modal harap masukkan modal 5000'
  users[who].money -= dapat * 1
 users[m.sender].money -= dapat * 1
  global.db.data.users[m.sender].lastdagang = new Date * 1
  let text = `Mohon tunggu kak..\nKamu dan @${who.split(`@`)[0]} sedang berdagang.. ðŸ˜…\n\nKamu dan @${who.split(`@`)[0]} meletakkan modal -${dapat} ðŸ˜…`
  conn.reply(m.chat, text, m, { mentions: [who] })
  setTimeout(() => {
let text2 = `Selamat kamu dan @${who.split(`@`)[0]} mendapatkan money..\n\nPenghasilan dagang kamu didapatkan +5000\n${users[m.sender].money += 5000} Money kamu\n\nPenghasilan dagang @${who.split(`@`)[0]} didapatkan +5000\n${users[who].money += 5000} Money @${who.split(`@`)[0]}`
conn.reply(m.chat, text2, m, { mentions: [who] })					
					}, 3600000)
  setTimeout(() => {
let text3 = `Selamat kamu dan @${who.split(`@`)[0]} mendapatkan money..\n\nPenghasilan dagang kamu didapatkan +5000\n${users[m.sender].money += 5000} Money kamu\n\nPenghasilan dagang @${who.split(`@`)[0]} didapatkan +5000\n${users[who].money += 5000} Money @${who.split(`@`)[0]}`
conn.reply(m.chat, text3, m, { mentions: [who] })
					}, 7200000)
  setTimeout(() => {
  let text4 = `Selamat kamu dan @${who.split(`@`)[0]} mendapatkan money..\n\nPenghasilan dagang kamu didapatkan +5000\n${users[m.sender].money += 5000} Money kamu\n\nPenghasilan dagang @${who.split(`@`)[0]} didapatkan +5000\n${users[who].money += 5000} Money @${who.split(`@`)[0]}`
  conn.reply(m.chat, text4, m, { mentions: [who] })
					}, 10800000)
  setTimeout(() => {
let text5 = `Selamat kamu dan @${who.split(`@`)[0]}} mendapatkan money..\n\nPenghasilan dagang kamu didapatkan +5000\n${users[m.sender].money += 5000} Money kamu\n\nPenghasilan dagang @${who.split(`@`)[0]} didapatkan +5000\n${users[who].money += 5000} Money @${who.split(`@`)[0]}`
conn.reply(m.chat, text5, m, { mentions: [who] })
					}, 14400000)
  setTimeout(() => {
let text6 = `Selamat kamu dan  @${who.split(`@`)[0]} mendapatkan money..\n\nPenghasilan dagang kamu didapatkan +5000\n${users[m.sender].money += 5000} Money kamu\n\nPenghasilan dagang  @${who.split(`@`)[0]}} didapatkan +5000\n${users[who].money += 5000} Money  @${who.split(`@`)[0]}`
conn.reply(m.chat, text6, m, { mentions: [who] })
					}, 18000000)
  setTimeout(() => {
let text7 = `Selamat kamu dan  @${who.split(`@`)[0]} mendapatkan money..\n\nPenghasilan dagang kamu didapatkan +5000\n${users[m.sender].money += 5000} Money kamu\n\nPenghasilan dagang  @${who.split(`@`)[0]} didapatkan +5000\n${users[who].money += 5000} Money  @${who.split(`@`)[0]}`
conn.reply(m.chat, text7, m, { mentions: [who] })
					}, 21600000)
  setTimeout(() => {
let text8 = `Selamat kamu dan  @${who.split(`@`)[0]} mendapatkan money..\n\nPenghasilan dagang kamu didapatkan +5000\n${users[m.sender].money += 5000} Money kamu\n\nPenghasilan dagang  @${who.split(`@`)[0]} didapatkan +5000\n${users[who].money += 5000} Money @${who.split(`@`)[0]}`
conn.reply(m.chat, text8, m, { mentions: [who] })
					}, 25200000)
  setTimeout(() => {
let text9 = `Selamat kamu dan @${who.split(`@`)[0]} mendapatkan money..\n\nPenghasilan dagang kamu didapatkan +10000\n${users[m.sender].money += 10000} Money kamu\n\nPenghasilan dagang @${who.split(`@`)[0]} didapatkan +10000\n${users[who].money += 10000} Money @${who.split(`@`)[0]}`
conn.reply(m.chat, text9, m, { mentions: [who] })
					}, 28800000)
}else m.reply(`Anda Sudah Berdagang , tunggu ${timers} lagi..`)
}
handler.help = ['berdagang *@tag*']
handler.tags = ['rpg']
handler.command = /^berdagang$/
handler.limit = true
handler.group = true

export default handler 

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}
function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  console.log({ms,h,m,s})
  return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')
}