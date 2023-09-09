import fs from 'fs'
import archiver from 'archiver'
import path from 'path'

let handler = async (m, { conn }) => {
  m.reply('Sedang mempersiapkan backup...')
  let backupName = `backup_${new Date().toISOString().replace(/:/g, '-')}.tar.gz`
  let output = fs.createWriteStream(backupName)
  let archive = archiver('tar.gz', { zlib: { level: 9 } })

  output.on('close', function () {
    let caption = `Berikut adalah file backup kode bot:\nNama file: ${backupName}\nUkuran file: ${(archive.pointer() / 1024 / 1024).toFixed(2)} MB`
    conn.sendFile(m.chat, backupName, backupName, caption, m)
  })

  archive.on('warning', function (err) {
    if (err.code === 'ENOENT') {
      console.warn(err)
    } else {
      throw err
    }
  });

  archive.on('error', function (err) {
    throw err
  })

  archive.pipe(output)
  archive.glob('**/*', {
    cwd: path.resolve(__dirname, '../'),
    ignore: ['node_modules/**', 'Dann.data.json/', 'tmp/**', '.npm/**', backupName]
  })
  archive.finalize()
}

handler.help = ['backup']
handler.tags = ['developer']
handler.command = /^backup$/i

handler.rowner = true

export default handler