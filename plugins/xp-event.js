let toM = (a) => "@" + a.split("@")[0];
function handler(m, { groupMetadata }) {
  let ps = groupMetadata.participants.map((v) => v.id);
  let a = ps.getRandom();
  let b;
  do b = ps.getRandom();
  while (b === a);
  m.reply(
    `${toM(
      a
    )} \n*Trimakasih Telah Mengikuti Event*\n*Tahun Baru:v Dan Selamat*\n*Lu Jadi Member Premium Selama*\n: *${(10).getRandom()} ${[
      "minggu",
      "bulan",
    ].getRandom()} Selamat Ya Jangan Iri Sama Yang Dapat Lebih Lama Prem Nya Yo....*`,
    null,
    {
      mentions: [a, b],
    }
  );
}
handler.help = ["event"];
handler.tags = ["xp"];
handler.command = ["event"];

handler.group = true;

export default handler;