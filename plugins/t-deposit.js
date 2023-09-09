import PhoneNumber from 'awesome-phonenumber'
import { Saweria } from '../lib/saweria.js' 

let handler = async (m, { conn, args }) => {
    conn.gateway = conn.gateway ? conn.gateway : {}

    if (!args || !args[0]) return m.reply('Masukkan jumlah deposit.')
    if (isNaN(args[0])) return m.reply('Nominal yang akan di deposit harus berupa angka.')
    const price = Number(args[0])
    if (price < 1000) return m.reply('Nominal deposit minimum adalah Rp.1000.')    
    const percent = (nominal, cent = 6) => (nominal * cent) / 100
    const formattedPrice = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price)
    const formattedPPN = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(percent(price))

    let { key } = await conn.reply(m.chat, `Faktur "DEPOSIT" dengan rincian sebagai berikut :\n\n◦ *Nomor* : ${PhoneNumber('+' + m.sender.split('@')[0]).getNumber('international')}\n◦ *Harga* : ${formattedPrice}\n◦ *PPN* : ${formattedPPN}\n\n*Reply/balas Pesan Ini!*\n_Ketik *Y* untuk melanjutkan proses pembayaran dan ketik *N* untuk membatalkan_`, m)
    conn.gateway[m.chat] = { 
       price,
       key,
       timeout: setTimeout(() => {
                conn.sendMessage(m.chat, { delete: key })
                delete conn.gateway[m.chat]
           }, 160000)
       }
}

handler.before = async (m, { conn }) => {
  conn.gateway = conn.gateway ? conn.gateway : {}
  if (m.isBaileys || !(m.chat in conn.gateway)) return
  const {
      price,
      key,
      timeout
      } = conn.gateway[m.chat]
  if (!m.quoted || m.quoted.id !== key.id || !m.text) return
  var teks = m.text.trim()
  if (!(teks == 'Y' || teks == 'N')) {
  } else if (/^Y(es|a)?$/i.test(teks)) {
    m.reply('Mohon Tunggu...').then(() => {
      conn.gateway[m.chat] = {
          state: 'PENDING',
          jid: m.sender,
          amount: price,
          admin: parseInt(price),
          package: 'DEPOSITO',
          created_at: Date.now(),
          receipt: ''
        }
    })
    
    const gateway = conn.gateway[m.chat] // fix this line
    if (!gateway) return 
  
    const total = parseInt(gateway.amount) + parseInt(gateway.admin) 
    const Pay = new Saweria(conn.saweria)
    const json = await Pay.createPayment(total, gateway.package) 
  
    if (!json.status) return m.reply(`Error:\n${json.msg}`) 
  
    let teks = `乂  *Q R I S*\n\n` 
    teks += `“Lakukan pembayaran sebelum ${json.data.expired_at} WIB”\n\n` 
    teks += `➠ *ID* Pembayaran: ${json.data.id}\n` 
    teks += `➠ *Total*  Pembayaran: Rp. ${formatter(json.data.amount_raw)},-\n\n` 
    teks += `Catatan:\n` 
    teks += `- Kode QR hanya valid untuk 1 kali transfer.\n` 
    teks += `- Setelah pembayaran, tunggu sebentar lalu kirim *${usedPrefix}saweria check* untuk cek status pembayaran.\n` 
    teks += `- Jika pembayaran berhasil, status akan diperbarui otomatis\n` 
    teks += `- Untuk bantuan lebih lanjut, hubungi *${usedPrefix}owner*` 
  
    conn.sendFile(m.chat, Buffer.from(json.data.qr_image.split(',')[1], 'base64'), 'qr.png', teks, m).then(() => { 
      gateway.state = 'PROCESS' 
      gateway.receipt = json.data.id 
    })
    
    conn.sendMessage(m.chat, { delete: key })
    clearTimeout(timeout)
  } else if (/^N(o)?$/i.test(teks)) {
    conn.sendMessage(m.chat, { delete: key })
    delete conn.gateway[m.chat]
    conn.reply(m.chat, "✓ Anda telah membatalkan pembelian.", m)
    clearTimeout(timeout)
    return !0
  }
}
handler.help = ['deposit']
handler.tags = ['tools']
handler.command = /^(deposit|depo)$/i

export default handler