const { MessageType } = require('@adiwajshing/baileys')
const { performance } = require('perf_hooks')
const osu = require('node-os-utils')

const handler = async (m, { conn, usedPrefix, DevMode }) => {
  try {
    const NotDetect = 'Not Detect'
    const old = performance.now()
    const cpu = osu.cpu
    const cpuCore = cpu.count()
    const drive = osu.drive
    const mem = osu.mem
    const netstat = osu.netstat
    const OS = osu.os.platform()
    const cpuModel = cpu.model()
    let cpuPer
    const p1 = cpu.usage().then(cpuPercentage => {
      cpuPer = cpuPercentage
    }).catch(() => {
      cpuPer = NotDetect
    })
    let driveTotal, driveUsed, drivePer
    const p2 = drive.info().then(info => {
      driveTotal = `${info.totalGb} GB`
      driveUsed = info.usedGb
      drivePer = `${info.usedPercentage}%`
    }).catch(() => {
      driveTotal = NotDetect
      driveUsed = NotDetect
      drivePer = NotDetect
    })
    let ramTotal, ramUsed
    const p3 = mem.info().then(info => {
      ramTotal = info.totalMemMb
      ramUsed = info.usedMemMb
    }).catch(() => {
      ramTotal = NotDetect
      ramUsed = NotDetect
    })
    let netsIn, netsOut
    const p4 = netstat.inOut().then(info => {
      netsIn = `${info.total.inputMb} MB`
      netsOut = `${info.total.outputMb} MB`
    }).catch(() => {
      netsIn = NotDetect
      netsOut = NotDetect
    })
    await Promise.all([p1, p2, p3, p4])
    await m.reply('Tunggu Sebentar...')
    const _ramTotal = `${ramTotal} MB`
    const neww = performance.now()
    conn.reply(m.chat, `
*Status ${global.wm2}'s*

OS: *${OS}*
CPU Model: *${cpuModel}*
CPU Core: *${cpuCore} Core*
CPU: *${cpuPer}%*
Ram: *${ramUsed} / ${_ramTotal}(${/[0-9.+/]/g.test(ramUsed) &&  /[0-9.+/]/g.test(ramTotal) ? Math.round(100 * (ramUsed / ramTotal)) + '%' : NotDetect})*
Drive: *${driveUsed} / ${driveTotal} (${drivePer})*
Ping: *${Math.round(neww - old)} ms*
Internet IN: *${netsIn}*
Internet OUT: *${netsOut}*
`.trim(), m)
    console.log(OS)
  } catch (e) {
    console.log(e)
    m.reply('Error!!')
    if (DevMode) {
      for (const jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
        conn.sendMessage(jid, `Status.js error\nNo: *${m.sender.split`@`[0]}*\nCommand: *${m.text}*\n\n*${e}*`, MessageType.text)
      }
    }
  }
}

handler.help = ['', 'bot'].map(v => 'status' + v)
handler.tags = ['info']
handler.command = /^(stats)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

export default handler

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  console.log({ms,h,m,s})
  return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')
}