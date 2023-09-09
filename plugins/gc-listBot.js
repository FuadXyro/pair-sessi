/* Update By FuadXy, Not Delete*/


let handler = async (m, { conn, args, usedPrefix }) => {
const data = conn.chats;
const messagesWithBAEPrefix = getMessagesWithBAEPrefix(data);
const uniqueData = filterUniqueObjects(messagesWithBAEPrefix, 'participant');
const chat = m.chat;
const filteredData = uniqueData.filter(item => item.room === chat);
const formattedData = await Promise.all(filteredData.map(async (item, index) => `
${index + 1}.
Group: ${await conn.getName(item.room)}
Name: ${await conn.getName(item.participant)}
Link: wa.me/${item.participant.split('@')[0]}
`));
await conn.reply(m.chat, formattedData.join('\n'), m, { contextInfo: { isForwarded: false, forwardingScore: 9999, externalAdReply :{ mediaType: 1, mediaUrl: thumb2, title: `L I S T`, body: `B O T`, thumbnail: { url: thumb2 }, thumbnailUrl: thumb2, renderLargerThumbnail: true }}})
}
handler.help = ['listbot']
handler.tags = ['group']
handler.command = /^listbot$/i
export default handler

function getMessagesWithBAEPrefix(data) {
  const result = [];
  for (const roomId in data) {
    const roomMessages = data[roomId].messages;
    for (const messageId in roomMessages) {
      if (typeof messageId === 'string' && messageId.startsWith('BAE')) {
        const content = roomMessages[messageId].key;
        result.push({ room: roomId, id: messageId, participant: content.participant });
      }
    }
  }
  return result;
}

function filterUniqueObjects(arr, prop) {
  return arr.filter((item, index) => {
    const itemProp = item[prop];
    return (
      index === arr.findIndex(obj => obj[prop] === itemProp)
    );
  });
}