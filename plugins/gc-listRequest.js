import { parsePhoneNumber } from 'awesome-phonenumber';
import { someIncludes } from '../lib/others.js';

let handler = async (m, { conn, args }) => {
	try {
		let response = await conn.groupRequestParticipantsList(m.chat);
		if (args[0]) {
			response = response.map(v => v.jid);
			if (someIncludes(['acc', 'terima'], args[0])) args[0] = 'approve';
			else if (someIncludes(['reject', 'tolak'], args[0])) args[0] = 'reject';
			else return m.reply('mau di reject atau acc?');
			let anu = await conn.groupRequestParticipantsUpdate(m.chat, response, args[0]);
			m.reply(`success *${args[0]}* all request`);
		} else {
			let txt = `*[ LIST REQUEST JOIN ]*\n${response.length} User`.replace(/%/g, '```');
			for (let x of response) {
				let y = await parsePhoneNumber(x.jid.split('@')[0], { regionCode: 'ID' });
				let date = new Date(parseInt(x.request_time));
				let date2 = date.getHours() + ':' + date.getMinutes() + ', ' + date.toDateString();
				txt += `\n\n*Number :* ${y.getNumber('international')}\n`;
				txt += `*Req By :* ${x.request_method}\n`;
				txt += `*Time :* ${date2}\n`;
				txt += `───────────────────`;
			}
			m.reply(txt);
		}
	} catch (e) {
		console.error(e);
		m.reply('Terjadi kesalahan pada sistem.');
	}
}

handler.help = ['listreq <acc/reject>'];
handler.tags = ['group'];
handler.command = /^(listreq(uest)?)$/i;

handler.admin = true;
handler.botAdmin = true;
handler.group = true;

export default handler;