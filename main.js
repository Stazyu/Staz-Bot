const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange,
} = require('@adiwajshing/baileys')
const fs = require('fs')
const { banner, start, success } = require('./lib/functions')
const { color } = require('./lib/color')
const { getBuffer } = require('./lib/functions')

let dbWelcome = JSON.parse(fs.readFileSync('./lib/database/group/welcome.json'))

require('./index.js')
nocache('./index.js', (module) => console.log(`${module} is now updated!`))
require('./setting.json')
nocache('./setting.json', (module) => console.log(`${module} is now updated!`))

const starts = async (conn = new WAConnection()) => {
    conn.logger.level = 'warn'
    conn.version = [2, 2142, 12]
    conn.browserDescription = ['STAZBOT', 'Chrome', '3.0']
    conn.autoReconnect = 1
    console.log(banner.string)
    conn.on('qr', () => {
        console.log(color('[', 'white'), color('!', 'red'), color(']', 'white'), color(' Scan bang'))
    })

    fs.existsSync('./session.json') && conn.loadAuthInfo('./session.json')
    conn.on('connecting', () => {
        start('2', 'Connecting...')
    })
    conn.on('open', () => {
        success('2', 'Connected')
    })
    await conn.connect({ timeoutMs: 30 * 1000 })
    fs.writeFileSync(
        './session.json',
        JSON.stringify(conn.base64EncodedAuthInfo(), null, '\t'),
    )

    conn.on('chat-update', async (message) => {
        require('./index.js')(conn, message)
    })

    conn.on('ws-close', async () => {
        console.log('Connection disconnected, trying to reconnect...');
        await conn.connect({ timeoutMs: 30 * 1000 })
    })

    conn.on('close', async ({ reason, isReconnecting }) => {
        console.log('Disconnected, Reason :' + reason + '\nTrying to connect... :' + isReconnecting);
        if (reason === 'timed out') {
            await conn.connect({ timeoutMs: 30 * 1000 })
            console.log('Timed Out. Reconnecting again..');
        }
        // if (!isReconnecting) {
        //     console.log('Connect To Phone Rejected and Shutting Down.');
        // }
    })

    conn.on('group-participants-update', async (group) => {
        const welcome = JSON.parse(fs.readFileSync('./lib/database/group/welcome.json'))
        // for (let i in welcome) {
        //     if (!welcome[i].id.includes(group.jid)) return
        // }
        try {
            const mdata = await conn.groupMetadata(group.jid)
            console.log(group.action)
            if (group.action == 'add') {
                num = group.participants[0]
                try {
                    ppimg = await conn.getProfilePicture(`${group.participants[0].split('@')[0]}@c.us`)
                } catch {
                    ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
                }
                const nomor = num.replace('@s.whatsapp.net', '')
                let buff = await getBuffer(ppimg)
                // const groupText = getTextWelcome(group.jid)
                // if (groupText.text != null) {
                //     const text = (groupText.text.replace('@user', `@${nomor}`).replace('@grup', mdata.subject))
                //     conn.sendMessage(mdata.id, buff, MessageType.image, { caption: text, contextInfo: { "mentionedJid": [num] } })
                // } else {
                const teks = capt_welcome(num, mdata.subject)
                conn.sendMessage(mdata.id, buff, MessageType.image, { caption: teks, contextInfo: { "mentionedJid": [num] } })
                // }
            } else if (group.action == 'remove') {
                num = group.participants[0]
                try {
                    ppimg = await conn.getProfilePicture(`${num.split('@')[0]}@c.us`)
                } catch {
                    ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
                }
                const teks = capt_left(num, mdata.subject)
                let buff = await getBuffer(ppimg)
                conn.sendMessage(mdata.id, buff, MessageType.image, { caption: teks, contextInfo: { "mentionedJid": [num] } })
            }
        } catch (err) {
            console.log('Error: ' + color(err, 'red'))
        }
    })
}

/**
 * Uncache if there is file change
 * @param {string} module Module name or path
 * @param {function} cb <optional>
 */
function nocache(module, cb = () => { }) {
    console.log('Module', `'${module}'`, 'is now being watched for changes')
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        cb(module)
    })
}

/**
 * Uncache a module
 * @param {string} module Module name or path
 */
function uncache(module = '.') {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)]
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}

function capt_welcome(jid, name) {
    return `Halo @${jid.replace('@s.whatsapp.net', '')} 👋\nWelcome to the *Grup ${name}*

NewMem Tolong di Isi ya😊
*Intro GC 「${name}」:*

*>>Nama :*

*>>Usia :*

*>>Asal :*

*>>Gender :*

Salam Kenal👋

※JanganLupaBacaDeskripsi😊
※PatuhiPeraturanGC😊`
}

function capt_left(jid, name) {
    return `Selamat Tinggal @${jid.replace('@s.whatsapp.net', '')} di Grup ${name} 👋. Semoga Sehat selalu di sana`
}

function getTextWelcome(from) {
    const dbWelcome = JSON.parse(fs.readFileSync('./lib/database/group/welcome.json'))
    let result = null
    Object.keys(dbWelcome).forEach((i) => {
        if (dbWelcome[i].id === from) {
            result = dbWelcome[i]
        } else {
            result = null
        }
    })

    return result
}

starts()
