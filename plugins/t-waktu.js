import axios from 'axios';

let handler = async (m, { conn, text }) => {
    if (!text) return conn.reply(m.chat, 'Masukkan Nama Daerahnya', m);
    axios.get(`https://worldtimeapi.org/api/timezone/Asia/${text}`).then((res) => {
        let hasil = `
            Waktu Daerah *${text}*
            Tanggal dan Waktu : ${res.data.datetime}
            Time Zone : ${res.data.timezone}
        `;
        conn.reply(m.chat, hasil, m);
    }).catch((err) => {
        conn.reply(m.chat, `Daerah '${text}' tidak ditemukan atau terjadi kesalahan.`, m);
    });
};

handler.help = ['waktu'].map(v => v + ' <daerah>');
handler.tags = ['tools', 'kabul'];
handler.command = /^(waktu)$/i;
handler.owner = false;
handler.mods = false;
handler.premium = false;
handler.group = false;
handler.private = false;
handler.admin = false;
handler.botAdmin = false;
handler.fail = null;
handler.exp = 0;
handler.limit = false;

export default handler;