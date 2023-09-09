let handler = async (m, { conn, usedPrefix: _p, __dirname, args }) => {
  const Message = {
    templateMessage: {
      hydratedTemplate: {
        hydratedButtons: [],
        hydratedContentText: 'SHOPEE: Gunakan Kode OTP 726031 UNTUK LOG IN AKUN SHOPEE. Hanya berlaku 15 menit. JANGAN berikan kode ke siapa pun, termasuk pihak Shopee.',
        templateId: '488213856412603'
      },
      templateId: '488213856412603'
    }
  };
  conn.sendMessage(m.chat, Message, m);
  m.reply('work');
};
handler.tags = ['tes'];
handler.command = /^(tes12)$/i;

export default handler;