import axios from 'axios';

let handler = async (m, { conn, text }) => {
  if (!text) throw 'Input Number';
  if (!text.match(/08|62/g)) throw 'Number Not Supported';
  let num = (text || '').replace(/\D/g, '');
  let s = new URLSearchParams();
  s.append('accountBank', 'dana');
  s.append('accountNumber', num);
  let go = await axios.post('https://cekrek.heirro.dev/api/check', s, {
    headers: { 'content-type': 'application/x-www-form-urlencoded' }
  });
  if (go.status !== 200) throw go.data.message;
  let caption = `\n\n*° D A N A - F I N D E R °*\n\n*∙ Account :* ${
    go.data.data[0].accountNumber
  }\n*∙ Name :* ${go.data.data[0].accountName.replace('DANA', ' ')}\n\n`;
  m.reply(caption);
};

handler.help = ['Dana'];
handler.tags = ['host'];
handler.command = /^(dana)$/i;

export default handler;