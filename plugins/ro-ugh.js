import fs from 'fs'
import util from 'util'
import cp from 'child_process'

const exec = util.promisify(cp.exec).bind(cp)
const delay = ms => new Promise(res => setTimeout(res, ms))

let handler = async ({ Helper, Plugins, m, conn, command, text, set }) => {
  let { reload, plugins, pluginFolder, link } = plugins
  let ucap = 'script dari github...'
  if (/g/i.test(command)) ucap = 'script ke github...'
  if (/npm/i.test(command)) ucap = 'semua module ke versi terbaru...' 
  m.reply('Mengupdate ' + ucap).then(async sel => {
    let o = 'file'
    try {
      if (/npm/i.test(command)) {
        let npm = '', res = JSON.parse(fs.readFileSync("package.json"))
        res = Object.keys(res.dependencies)
        res = res.map(v => 'npm i ' + v + '@latest').join(' && ')
        for (let i of res) npm += i
        o = await exec(npm)
      } else if (/g/i.test(command)) {
        o = await exec(`git config --global user.email "${link.git.hide.email}" && git config --global user.name "${link.git.hide.name}" && git add . && git commit -m "${text ? text : 'update via bot'}" && git push`)         
      } else o = await exec(`git remote set-url origin ${link.git.hide.update} && git pull`)                           
    } catch (e) {
      o = e
    } finally {
      let { stdout, stderr } = o
      if (/plugin/.test(stdout + stderr)) Object.keys(plugins).map(v => v.split('plugins/')[1]).map(v => reload({ pluginFolder }, null, v))
      if (stdout) return m.reply(stdout, null, { quoted: sel })
      if (stderr) return m.reply(stderr, null, { quoted: sel })
    }
  })
}

handler.help = ['ugh text?']
handler.tags = ['developer']
handler.command = /^(ugh)$/i
handler.rowner = true

export default handler