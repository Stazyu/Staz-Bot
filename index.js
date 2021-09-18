const {
    WAConnection,
    MessageType,
    Presence,
    MessageOptions,
    Mimetype,
    WALocationMessage,
    WA_MESSAGE_STUB_TYPES,
    WA_DEFAULT_EPHEMERAL,
    ReconnectMode,
    ProxyAgent,
    GroupSettingChange,
    waChatKey,
    mentionedJid,
    processTime,
    BaileysError,
    participant
} = require("@adiwajshing/baileys")
const hx = require('hxz-api')
const qrcode = require("qrcode-terminal")
const moment = require("moment-timezone")
const speed = require('performance-now')
const request = require('request');
const { spawn, exec, execSync } = require("child_process")
const fs = require("fs")
const axios = require("axios")
const ffmpeg = require('fluent-ffmpeg')
const { EmojiAPI } = require("emoji-api");
const ig = require('insta-fetcher')
const emoji = new EmojiAPI()
const fetch = require('node-fetch');
const phoneNum = require('awesome-phonenumber')
const gis = require('g-i-s');
const got = require("got");
const imageToBase64 = require('image-to-base64');
const ID3Writer = require('browser-id3-writer');
const brainly = require('brainly-scraper')
const yts = require('yt-search')
const ms = require('parse-ms')
const toMs = require('ms')
const cron = require('node-cron')

/// LOAD FILE ///
const { wait, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close, tanggal } = require('./lib/functions')
const { color, bgcolor } = require('./lib/color')
const { fetchJson, getBase64, kyun, createExif } = require('./lib/fetcher')
const { yta, ytv, igdl, upload, formatDate } = require('./lib/ytdl')
const { webp2gifFile } = require('./lib/webp2mp4')
const time = moment().tz('Asia/Jakarta').format("HH:mm:ss")
const { sleep, isAfk, cekafk, addafk } = require('./lib/offline')
const { addVote, delVote } = require('./lib/vote')
const { premium, sewa, userlimit } = require('./function/')
const { apakah, kapankah, bisakah, kelebihan, tipe, rate, ratenyaasu, sifat, hobby, watak, ratetampan, ratecantik, rategay, ratelesbi } = require('./lib/ratefun')
const { addFilter, isFiltered } = require('./lib/msgfilter')
const { addNotifBroadcast, checkIdBroadcast, getBroadcastPosition } = require('./function/notifbc')

/// DATABASE ///
let dbpremium = JSON.parse(fs.readFileSync('./lib/database/user/premium.json'))
let dbverify = JSON.parse(fs.readFileSync('./lib/database/user/verify.json'))
let dbsewa = JSON.parse(fs.readFileSync('./lib/database/group/sewa.json'))
let dbLimit = JSON.parse(fs.readFileSync('./lib/database/user/limit.json'))
let dberror = JSON.parse(fs.readFileSync('./lib/database/bot/error.json'))
let setting = JSON.parse(fs.readFileSync('./setting.json'))
let voting = JSON.parse(fs.readFileSync('./lib/voting.json'))
let afk = JSON.parse(fs.readFileSync('./lib/off.json'))
let db_notifbc = JSON.parse(fs.readFileSync('./lib/database/user/notif_broadcast.json'))
let welcome = JSON.parse(fs.readFileSync('./lib/database/group/welcome.json'))
let includes = [`play`]
let not_includes = {
    limit: ['menu', 'help', 'artinama', 'cekwatak', 'rate', 'ping', 'math', 'notifbc', 'limit', 'ceklimit']
}

// Options
offline = false
targetpc = '6285751056816'
fake = 'STAZ'
numbernye = '0'
waktu = '-'
alasan = '-'


let {
    singleprefix,
    zeksapi,
    banChats,
    ownerNumber,
    selfbot,
    ChatRead,
    single_multi,
} = setting

cron.schedule('0 0 * * *', () => {
    for (let i in totalchat) {
        if (totalchat[i].jid.includes('@g.us')) {
            // console.log(totalchat[i].jid);
            conn.modifyChat(totalchat[i].jid, 'clear')
        }
    }
    let reset = []
    dbLimit = reset
    console.log(color('Resetting limit...', 'green'));
    fs.writeFileSync('./lib/database/limit.json', JSON.stringify(dbLimit))
    console.log(color('Done, reset limit.', 'green'));
})

// Serial Number Generator
function GenerateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Generates a random alphanumberic character
function GenerateRandomChar() {
    var chars = "1234567890ABCDEFGIJKLMNOPQRSTUVWXYZ";
    var randomNumber = GenerateRandomNumber(0, chars.length - 1);
    return chars[randomNumber];
}
// Generates a Serial Number, based on a certain mask
function GenerateSerialNumber(mask) {
    var serialNumber = "";
    if (mask != null) {
        for (var i = 0; i < mask.length; i++) {
            var maskChar = mask[i];
            serialNumber += maskChar == "0" ? GenerateRandomChar() : maskChar;
        }
    }
    return serialNumber;
}

//=================================================//
// conn.on('chat-update', async (mek) => {
module.exports = conn = async (conn, mek) => {
    try {
        if (!mek.hasNewMessage) return
        mek = mek.messages.all()[0]
        if (!mek.message) return
        if (mek.key && mek.key.remoteJid == 'status@broadcast') return
        // if (!mek.key.fromMe) return
        global.blocked
        mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
        const content = JSON.stringify(mek.message)
        const from = mek.key.remoteJid
        const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
        const time = moment.tz('Asia/Jakarta').format('DD/MM/YY HH:mm:ss')
        const time_waktu = moment.tz('Asia/Jakarta').format('HH:mm:ss')
        const type = Object.keys(mek.message)[0]
        const cmd = (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : ''.slice(1).trim().split(/ +/).shift().toLowerCase()
        const multiprefix = /^[°•π÷×¶∆£¢€¥®™=|~!#$%^&.?/\\©^z+*@,;]/.test(cmd) ? cmd.match(/^[°•π÷×¶∆£¢€¥®™=|~!#$%^&.?/\\©^z+*,;]/gi) : '-'
        const prefix = single_multi ? multiprefix : singleprefix
        body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
        budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
        const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
        const args = body.trim().split(/ +/).slice(1)
        const isCmd = body.startsWith(prefix)
        const q = args.join(' ')
        const botNumber = conn.user.jid
        const botNumberss = conn.user.jid + '@c.us'
        const ownerNumber = [`6281578794887@s.whatsapp.net`]
        const isGroup = from.endsWith('@g.us')
        let sender = isGroup ? mek.participant : mek.key.remoteJid
        let senderid = mek.participant
        let fromMe = mek.key.fromMe
        // const isSelfNumber = config.NomorSELF
        // const isOwner = sender.id === isSelfNumber
        const isOwner = ownerNumber.includes(sender)
        const totalchat = await conn.chats.all()
        const groupMetadata = isGroup ? await conn.groupMetadata(from) : ''
        const groupName = isGroup ? groupMetadata.subject : ''
        const groupId = isGroup ? groupMetadata.id : ''
        const groupMembers = isGroup ? groupMetadata.participants : ''
        const groupDesc = isGroup ? groupMetadata.desc : ''
        const groupOwner = isGroup ? groupMetadata.owner : ''
        const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
        const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
        const isGroupAdmins = groupAdmins.includes(sender) || false
        const isVote = isGroup ? voting.includes(from) : false
        const conts = mek.key.fromMe ? conn.user.jid : conn.contacts[sender] || { notify: jid.replace(/@.+/, '') }
        const pushname = mek.key.fromMe ? conn.user.name : conts.notify || conts.vname || conts.name || '-'
        const SN = GenerateSerialNumber("000000000000000000000000")

        // Time
        if (time_waktu < "03:30:00") {
            var ucapanWaktu = 'Selamat Malam'
        } else if (time_waktu < "11:00:00") {
            ucapanWaktu = 'Selamat Pagi'
        } else if (time_waktu < "15:00:00") {
            ucapanWaktu = "Selamat Siang"
        } else if (time_waktu < "18:00:00") {
            ucapanWaktu = "Selamat Sore"
        } else if (time_waktu < "20:00:00") {
            ucapanWaktu = "Selamat Petang"
        } else if (time_waktu < "23:59:00") {
            ucapanWaktu = "selamat Malam"
        }
        const run = process.uptime()
        const runtime = `${kyun(run)}`
        const tgl = await tanggal()

        // Chat Read On/Off
        if (ChatRead) {
            conn.chatRead(from)
        }

        // Auto expired 
        const isPremium = premium.checkPremiumUser(senderid, dbpremium)
        const isSewa = sewa.checkSewa(groupId, dbsewa)

        //MESS
        const mess = {
            wait: '⌛ Sedang di Prosess ⌛',
            success: '✔️ Berhasil ✔️',
            botout: 'Terima kasih sudah menyewa Staz-Bot, bila mau berlangganan chat owner bot',
            error: {
                stick: '❌ Gagal, terjadi kesalahan saat mengkonversi gambar ke sticker ❌',
                Iv: '❌ Link tidak valid ❌'
            },
            only: {
                group: '❌ Perintah ini hanya bisa di gunakan dalam group! ❌',
                ownerGroup: '❌ Perintah ini hanya bisa di gunakan oleh owner group! ❌',
                ownerBot: '❌ Perintah ini hanya bisa di gunakan oleh owner bot! ❌',
                adminGroup: '❌ Perintah ini hanya bisa di gunakan oleh admin group! ❌',
                adminBot: '❌ Perintah ini hanya bisa di gunakan oleh admin bot! ❌',
                Botadmin: '❌ Perintah ini hanya bisa di gunakan ketika bot menjadi admin! ❌'
            }
        }

        premium.expiredCheck(dbpremium)
        sewa.expiredCheck(dbsewa, conn, mess.botout)

        const isUrl = (url) => {
            return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/, 'gi'))
        }

        const reply = (teks) => {
            conn.sendMessage(from, teks, text, { quoted: mek })
        }

        const sendText = (from, teks) => {
            conn.sendMessage(from, teks, text)
        }

        const mentions = (teks, memberr, id) => {
            (id == null || id == undefined || id == false) ? conn.sendMessage(from, teks.trim(), extendedText, { contextInfo: { "mentionedJid": memberr } }) : conn.sendMessage(from, teks.trim(), extendedText, { quoted: mek, contextInfo: { "mentionedJid": memberr } })
        }

        const sendImage = (bufferimg, capt) => {
            conn.sendMessage(from, bufferimg, image, { quoted: mek, caption: capt })
        }

        const sendSticker = (from, data, mek) => {
            if (typeof data === 'string') {
                conn.sendMessage(from, fs.readFileSync(data), MessageType.sticker, { quoted: mek })
            } else {
                conn.sendMessage(from, data, MessageType.sticker, { quoted: mek })
            }
            //wa.sendMessage(from, filename, MessageType.sticker, { quoted: mek } )
        }

        const fakestatus = (teks) => {
            conn.sendMessage(from, teks, text, {
                quoted: {
                    key: {
                        fromMe: false,
                        participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
                    },
                    message: {
                        "imageMessage": {
                            "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc",
                            "mimetype": "image/jpeg",
                            "caption": fake,
                            "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=",
                            "fileLength": "28777",
                            "height": 1080,
                            "width": 1079,
                            "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=",
                            "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=",
                            "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69",
                            "mediaKeyTimestamp": "1610993486",
                            "jpegThumbnail": fs.readFileSync('./stik/thumb.jpeg'),
                            "scansSidecar": "1W0XhfaAcDwc7xh1R8lca6Qg/1bB4naFCSngM2LKO2NoP5RI7K+zLw=="
                        }
                    }
                }
            })
        }

        const fakethumb = (teks, yes) => {
            conn.sendMessage(from, teks, image, { thumbnail: fs.readFileSync('./stik/fake.jpeg'), quoted: mek, caption: yes })
        }

        const fakegroup = (teks) => {
            conn.sendMessage(from, teks, text, {
                quoted: {
                    key: {
                        fromMe: false,
                        participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "6289523258649-1604595598@g.us" } : {})
                    },
                    message: {
                        "imageMessage": {
                            "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc",
                            "mimetype": "image/jpeg",
                            "caption": fake,
                            "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=",
                            "fileLength": "28777",
                            "height": 1080,
                            "width": 1079,
                            "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=",
                            "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=",
                            "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69",
                            "mediaKeyTimestamp": "1610993486",
                            "jpegThumbnail": fs.readFileSync('./stik/thumb.jpeg'),
                            "scansSidecar": "1W0XhfaAcDwc7xh1R8lca6Qg/1bB4naFCSngM2LKO2NoP5RI7K+zLw=="
                        }
                    }
                }
            })
        }

        const sendStickerFromUrl = async (to, url) => {
            var names = Date.now() / 10000;
            var download = function (uri, filename, callback) {
                request.head(uri, function (err, res, body) {
                    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                });
            };
            download(url, './stik' + names + '.png', async function () {
                console.log('selesai');
                let filess = './stik' + names + '.png'
                let asw = './stik' + names + '.webp'
                exec(`ffmpeg -i ${filess} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${asw}`, (err) => {
                    let media = fs.readFileSync(asw)
                    conn.sendMessage(to, media, MessageType.sticker, { quoted: mek })
                    fs.unlinkSync(filess)
                    fs.unlinkSync(asw)
                });
            });
        }

        const sendMediaURL = async (to, url, text = "", mids = []) => {
            if (mids.length > 0) {
                text = normalizeMention(to, text, mids)
            }
            const fn = Date.now() / 10000;
            const filename = fn.toString()
            let mime = ""
            var download = function (uri, filename, callback) {
                request.head(uri, function (err, res, body) {
                    mime = res.headers['content-type']
                    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                });
            };
            download(url, filename, async function () {
                console.log('done');
                let media = fs.readFileSync(filename)
                let type = mime.split("/")[0] + "Message"
                if (mime === "image/gif") {
                    type = MessageType.video
                    mime = Mimetype.gif
                }
                if (mime.split("/")[0] === "audio") {
                    mime = Mimetype.mp4Audio
                }
                conn.sendMessage(to, media, type, { quoted: mek, mimetype: mime, caption: text, contextInfo: { "mentionedJid": mids } })

                fs.unlinkSync(filename)
            });
        }

        const sendContact = (from, name, nomor) => {
            const vcard = 'BEGIN:VCARD\n' // metadata of the contact card
                + 'VERSION:3.0\n'
                + `FN:${name}\n` // full name
                + 'ORG:Ashoka Uni;\n' // the organization of the contact
                + `TEL;type=CELL;type=VOICE;waid=${nomor}:${phoneNum('+' + nomor).getNumber('internasional')}\n` // WhatsApp ID + phone number
                + 'END:VCARD'
            conn.sendMessage(from, { displayname: name, vcard: vcard }, contact)
        }
        //FUNCTION
        cekafk(afk)
        if (!mek.key.remoteJid.endsWith('@g.us') && offline) {
            if (!mek.key.fromMe) {
                if (isAfk(mek.key.remoteJid)) return
                addafk(mek.key.remoteJid)
                heheh = ms(Date.now() - waktu)
                conn.sendMessage(mek.key.remoteJid, `@${owner} Sedang Offline!\n\n*Alasan :* ${alasan}\n*Sejak :* ${heheh.hours} Jam, ${heheh.minutes} Menit, ${heheh.seconds} Detik lalu\n\nSilahkan Hubungi Lagi Nanti`, MessageType.text, { contextInfo: { mentionedJid: [`${owner}@s.whatsapp.net`], 'stanzaId': "B826873620DD5947E683E3ABE663F263", 'participant': "0@s.whatsapp.net", 'remoteJid': 'status@broadcast', 'quotedMessage': { "imageMessage": { "caption": "*OFFLINE*", 'jpegThumbnail': fs.readFileSync('./stik/thumb.jpeg') } } } })
            }
        }
        if (mek.key.remoteJid.endsWith('@g.us') && offline) {
            if (!mek.key.fromMe) {
                if (mek.message.extendedTextMessage != undefined) {
                    if (mek.message.extendedTextMessage.contextInfo != undefined) {
                        if (mek.message.extendedTextMessage.contextInfo.mentionedJid != undefined) {
                            for (let ment of mek.message.extendedTextMessage.contextInfo.mentionedJid) {
                                if (ment === `${owner}@s.whatsapp.net`) {
                                    if (isAfk(mek.key.remoteJid)) return
                                    addafk(mek.key.remoteJid)
                                    heheh = ms(Date.now() - waktu)
                                    conn.sendMessage(mek.key.remoteJid, `@${owner} Sedang Offline!\n\n *Alasan :* ${alasan}\n *Sejak :* ${heheh.hours} Jam, ${heheh.minutes} Menit, ${heheh.seconds} Detik lalu\n\nSilahkan Hubungi Lagi Nanti`, MessageType.text, { contextInfo: { mentionedJid: [`${owner}@s.whatsapp.net`], 'stanzaId': "B826873620DD5947E683E3ABE663F263", 'participant': "0@s.whatsapp.net", 'remoteJid': 'status@broadcast', 'quotedMessage': { "imageMessage": { "caption": "*OFFLINE*", 'jpegThumbnail': fs.readFileSync('./stik/thumb.jpeg') } } } })
                                }
                            }
                        }
                    }
                }
            }
        }

        let nmr = sender
        let cekverify = dbverify.some((val) => {
            return val.id === nmr
        })
        //========================================================================================================================//
        colors = ['red', 'white', 'black', 'blue', 'yellow', 'green']
        const isMedia = (type === 'imageMessage' || type === 'videoMessage')
        const isImage = type === 'imageMessage'
        const isVideo = type === 'videoMessage'
        const isSticker = type === 'stickerMessage'
        const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
        const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
        const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
        const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
        const isQuotedText = type === 'extendedTextMessage' && content.includes('conversation')

        // Self or Public
        if (!mek.key.fromMe && banChats && !isOwner) return

        // Selfbot (True or False)
        if (mek.key.fromMe && !selfbot) return

        // Cek Verifikasi
        if (isGroup && isCmd && body !== `${prefix}verify` && !cekverify && !fromMe)
            return reply(`Mohon Maaf anda belum melakukan verifikasi sebagai user Staz-Bot, untuk verifikasi ketik ${prefix}verify`)

        // Avoid Spam Message 
        if (isCmd && isFiltered(from) && !isGroup && !isOwner && !isPremium) { return console.log(color('~> [SPAM]', 'red'), time, color(`${command}`), 'from', color(pushname)), reply('Cooldown 5 detik. No spam!!') }
        if (isCmd && isFiltered(from) && isGroup && !isOwner && !isPremium) { return console.log(color('~> [SPAM]', 'red'), time, color(`${command}`), 'from', color(pushname), 'in', color(groupName)), reply('Cooldown 5 detik. No spam!!') }

        // Filter Spam Message
        addFilter(from)

        // Log Message & Command
        if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
        if (!isGroup && !isCmd) console.log('\x1b[1;34m~\x1b[1;37m>', '[\x1b[1;34mTEXT\x1b[1;37m]', time, color(mek.message.conversation || mek.message.extendedTextMessage.text), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
        if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
        if (!isCmd && isGroup && !fromMe) console.log('\x1b[1;34m~\x1b[1;37m>', '[\x1b[1;34mTEXT\x1b[1;37m]', time, color(mek.message.conversation || mek.message.extendedTextMessage.text), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))

        // Command limit includes
        // let limit = false;
        // if ((!isGroup && isCmd) || (isGroup && isCmd)) {
        //     for (let i = 0; i < includes.limit.length; i++) {
        //         if (`${prefix}${includes.limit[i]}` === body) {
        //             limit = true
        //         }
        //     }
        // }

        // Command limit not_includes
        let limit = true;
        if ((!isGroup && isCmd) || (isGroup && isCmd)) {
            for (let i = 0; i < not_includes.limit.length; i++) {
                if (not_includes.limit[i] === command || prefix.includes(body)) {
                    limit = false
                }
            }
        }

        // Batas limit command
        if (userlimit.isLimit(sender, dbLimit) && limit && !isPremium && !isOwner) {
            if (!isGroup && isCmd) {
                return reply('Limit anda sudah mencapai batas harian, coba esok lagi!')
            } else if (isGroup && isCmd) {
                return reply('Limit anda sudah mencapai batas harian, coba esok lagi!')
            }
        }

        // Create limit user & Add limit user
        if (!isGroup && isCmd && limit) { userlimit.isLimit(sender, dbLimit), userlimit.isLimitAdd(sender, dbLimit) }
        if (isGroup && isCmd && limit) { userlimit.isLimit(sender, dbLimit), userlimit.isLimitAdd(sender, dbLimit) }

        if (isGroup && !isVote) {
            if (budy.toLowerCase() === 'vote') {
                let vote = JSON.parse(fs.readFileSync(`./lib/${from}.json`))
                let _votes = JSON.parse(fs.readFileSync(`./lib/vote/${from}.json`))
                let fil = vote.map(v => v.participant)
                let id_vote = sender ? sender : '6285751056816@s.whatsapp.net'
                if (fil.includes(id_vote)) {
                    return mentions('@' + sender.split('@')[0] + ' Anda sudah vote', fil, true)
                } else {
                    vote.push({
                        participant: id_vote,
                        voting: '✅'
                    })
                    fs.writeFileSync(`./lib/${from}.json`, JSON.stringify(vote))
                    let _p = []
                    let _vote = '*Vote* ' + '@' + _votes[0].votes.split('@')[0] + `\n\n*Alasan*: ${_votes[0].reason}\n*Jumlah Vote* : ${vote.length} Vote\n*Durasi* : ${_votes[0].durasi} Menit\n\n`
                    for (let i = 0; i < vote.length; i++) {
                        _vote += `@${vote[i].participant.split('@')[0]}\n*Vote* : ${vote[i].voting}\n\n`
                        _p.push(vote[i].participant)
                    }
                    _p.push(_votes[0].votes)
                    mentions(_vote, _p, true)
                }
            } else if (budy.toLowerCase() === 'devote') {
                const vote = JSON.parse(fs.readFileSync(`./lib/${from}.json`))
                let _votes = JSON.parse(fs.readFileSync(`./lib/vote/${from}.json`))
                let fil = vote.map(v => v.participant)
                let id_vote = sender ? sender : '6285751056816@s.whatsapp.net'
                if (fil.includes(id_vote)) {
                    return mentions('@' + sender.split('@')[0] + ' Anda sudah vote', fil, true)
                } else {
                    vote.push({
                        participant: id_vote,
                        voting: '❌'
                    })
                    fs.writeFileSync(`./lib/${from}.json`, JSON.stringify(vote))
                    let _p = []
                    let _vote = '*Vote* ' + '@' + _votes[0].votes.split('@')[0] + `\n\n*Alasan*: ${_votes[0].reason}\n*Jumlah Vote* : ${vote.length} Vote\n*Durasi* : ${_votes[0].durasi} Menit\n\n`
                    for (let i = 0; i < vote.length; i++) {
                        _vote += `@${vote[i].participant.split('@')[0]}\n*Vote* : ${vote[i].voting}\n\n`
                        _p.push(vote[i].participant)
                    }
                    _p.push(_votes[0].votes)
                    mentions(_vote, _p, true)
                }
            }
        }

        // Cek Prefix
        if (budy === 'cekprefix') {
            const prf = single_multi ? 'Multi-Prefix' : singleprefix
            reply(`Prefix : ${prf}`)
        }

        if (budy === 'Bot' || budy === 'bot') {
            reply('Ada yang bisa di bantu? Ketik #menu untuk melihat menu bot')
        }

        switch (command) {
            case 'menu':
            case 'help':
                let ownerlimit = false
                if (isOwner || isPremium) { ownerlimit = true }
                const limit_user = userlimit.checkLimit(sender, dbLimit)
                const opbot = banChats ? 'SELF' : 'PUBLIC'
                const prf = single_multi ? 'MULTI-PREFIX' : singleprefix
                let menupublic = `Hai ${pushname}
${ucapanWaktu}👋

Prefix : 「 ${prf} 」

*INFO USER*
>> *Nama : ${pushname}*
>> *Premium : ${isPremium ? '✅' : '❌'}*
>> *Sisa Limit: ${ownerlimit ? 'Unlimited' : limit_user}*

*</ADMIN-GROUP>*
► _${prefix}hidetag_ <Teks>
► _${prefix}linkgroup_
► _${prefix}welcome_ <on/off>

*</MAKER>*
► _${prefix}sticker_
► _${prefix}swm_ <author|packname>
► _${prefix}take_ <author|packname>
► _${prefix}emoji_

*</CONVERT>*
► _${prefix}toimg_
► _${prefix}tomp3_
► _${prefix}tomp4_
► _${prefix}slow_
► _${prefix}fast_
► _${prefix}reverse_
► _${prefix}tourl_

*</FUN>*
► _${prefix}artinama_
► _${prefix}jadian_
► _${prefix}kapankah_
► _${prefix}apakah_
► _${prefix}bisakah_
► _${prefix}rategay_
► _${prefix}ratelesbi_
► _${prefix}ratetampan_
► _${prefix}ratecantik_
► _${prefix}cekwatak_
► _${prefix}rate_

*</DOWNLOAD>*
► _${prefix}ytsearch_ <query>
► _${prefix}igstalk_ <query>
► _${prefix}play_ <query>
► _${prefix}video_ <query>
► _${prefix}ytmp3_ <link>
► _${prefix}ytmp4_ <link>
► _${prefix}ig_ <link>
► _${prefix}igstory_ <username>
► _${prefix}twitter_ <link>
► _${prefix}tiktok_ <link>
► _${prefix}tiktokaudio_ <link>
► _${prefix}fb_ <link>
► _${prefix}brainly_ <query>
► _${prefix}image_ <query>
► _${prefix}anime_ <random>
► _${prefix}pinterest_ <query>
► _${prefix}komiku_ <query>
► _${prefix}lirik_ <query>
► _${prefix}chara_ <query>
► _${prefix}playstore_ <query>
► _${prefix}otaku_ <query>

*</OTHER>*
► _cekprefix_
► _${prefix}ping_
► _${prefix}math_
► _${prefix}notifbc_ <off/on>

*</VOTE>*
► _${prefix}voting_
► _${prefix}delvote_
► _vote_
► _devote_

*INFO BOT*
>> *Nama Bot : Staz-Bot*
>> *Owner : wa.me/6281578794887*
>> *Total user terverifikasi : ${dbverify.length}*
>> *Total user premium : ${dbpremium.length}*
>> *Runtime : ${runtime}*
>> *Waktu Server : ${time} WIB*
>> *Tanggal : ${tgl}*

❏ *${opbot}-BOT* ❏`
                /*-----------------------------------------------*/
                let menuself = `Hai ${pushname}                 
${ucapanWaktu}👋

Prefix : 「 ${prf} 」

*</OWNER>*
► _${prefix}off_
► _${prefix}on_
► _${prefix}status_
► _${prefix}self_
► _${prefix}public_

*</MAKER>*
► _${prefix}sticker_
► _${prefix}swm_ <author|packname>
► _${prefix}take_ <author|packname>
► _${prefix}fdeface_
► _${prefix}emoji_

*</CONVERT>*
► _${prefix}toimg_
► _${prefix}tomp3_
► _${prefix}tomp4_
► _${prefix}slow_
► _${prefix}fast_
► _${prefix}reverse_
► _${prefix}tourl_

*</UP STORY>*
► _${prefix}upswteks_
► _${prefix}upswimage_
► _${prefix}upswvideo_

*</DOWNLOAD>*
► _${prefix}ytsearch_ <query>
► _${prefix}igstalk_ <query>
► _${prefix}play_ <query>
► _${prefix}video_ <query>
► _${prefix}ytmp3_ <link>
► _${prefix}ytmp4_ <link>
► _${prefix}ig_ <link>
► _${prefix}igstory_ <username>
► _${prefix}twitter_ <link>
► _${prefix}tiktok_ <link>
► _${prefix}tiktokaudio_ <link>
► _${prefix}fb_ <link>
► _${prefix}brainly_ <query>
► _${prefix}image_ <query>
► _${prefix}anime_ <random>
► _${prefix}pinterest_ <query>
► _${prefix}komiku_ <query>
► _${prefix}lirik_ <query>
► _${prefix}chara_ <query>
► _${prefix}playstore_ <query>
► _${prefix}otaku_ <query>

*</OTHER>*
► _cekprefix_
► _${prefix}setthumb_
► _${prefix}settarget_
► _${prefix}setfakeimg_
► _${prefix}setreply_
► _${prefix}ping_
► _${prefix}inspect_
► _${prefix}join_
► _${prefix}caripesan_ <query>
► _${prefix}get_
► _${prefix}term_ <code>
► _x_ <code>

*</VOTE>*
► _${prefix}voting_
► _${prefix}delvote_
► _vote_
► _devote_

*INFO BOT*
>> *Nama Bot : Staz-Bot*
>> *Owner : wa.me/6281578794887*
>> *Total user terverifikasi : ${dbverify.length}*
>> *Total user premium : ${dbpremium.length}*
>> *Runtime : ${runtime}*
>> *Waktu Server : ${time} WIB*
>> *Tanggal : ${tgl}*

❏ *${opbot}-BOT* ❏`
                const menu = banChats ? menuself : menupublic
                fakestatus(menu)
                break
            case 'tes':
                if (!isOwner && !fromMe) return reply('Maaf ini fitur khusus owner kak!!')
                for (let i in totalchat) {
                    if (totalchat[i].jid.includes('@g.us')) {
                        // console.log(totalchat[i].jid);
                        conn.modifyChat(totalchat[i].jid, 'clear')
                    }
                }
                // conn.modifyChat('62851550020544-1631859720@g.us', 'clear')
                reply('tes')
                break
            case 'ownermenu':
                if (!isOwner && !fromMe) return reply('Khusus Owner kak!')
                fakestatus(`► _${prefix}off_
            ► _${prefix}on_
            ► _${prefix}status_
            ► _${prefix}self_
            ► _${prefix}public_
            ► _${prefix}setthumb_
            ► _${prefix}settarget_
            ► _${prefix}setfakeimg_
            ► _${prefix}setreply_
            ► _${prefix}inspect_
            ► _${prefix}join_
            ► _${prefix}caripesan_ <query>
            ► _${prefix}get_
            ► _${prefix}term_ <code>
            ► _x_ <code>
            ► _${prefix}upswteks_
            ► _${prefix}upswimage_
            ► _${prefix}upswvideo_
            ► _${prefix}premium_ <add/del tag/no duration>
            `)
                break
            case 'tagmenu':
                if (!isGroupAdmins) return reply('Khusus untuk admin grup')
                fakestatus(`*</TAG>*
► _${prefix}hidetag_
► _${prefix}kontag_
► _${prefix}sticktag_
► _${prefix}totag_`
                )
                break
            case 'funmenu':
                fakestatus(`*</FUN>*
► _${prefix}fitnah_
► _${prefix}fitnahpc_
► _${prefix}kontak_
            `)
                break
            case 'bc':
                if (!fromMe && !isOwner) return reply(mess.only.ownerBot)
                if (args.length === 0) return reply(`Masukkan text`)
                let chiit = await totalchat
                if (isImage || isQuotedImage) {
                    let encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                    let media = await conn.downloadMediaMessage(encmedia)
                    for (let i of chiit) {
                        if (checkIdBroadcast(i.jid)) {
                            conn.sendMessage(i.jid, media, image, { caption: q })
                        }
                    }
                    reply(`Sukses`)
                } else if (isVideo || isQuotedVideo) {
                    let encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                    let media = await conn.downloadMediaMessage(encmedia)
                    for (let i of chiit) {
                        if (checkIdBroadcast(i.jid)) {
                            conn.sendMessage(i.jid, media, video, { caption: q })
                        }
                    }
                    reply(`Sukses`)
                } else {
                    for (let i of chiit) {
                        if (checkIdBroadcast(i.jid)) {
                            conn.sendMessage(i.jid, q, text)
                        }
                    }
                    reply(`Sukses`)
                }
                break
            case 'notifbc':
                if (isGroup) return reply('Khusus di private')
                if (args.length < 1) return reply(`Ketik ${prefix}notifbc on untuk mengaktifkan, untuk mematikan ketik ${prefix}notifbc off`)
                if (args[0] === 'off') {
                    addNotifBroadcast(from)
                    reply(`Done. Anda sudah tidak menerima notifikasi lagi dari bot, bilang ingin menyalakan notifikasi dari bot ketik${prefix}notifbc on`)
                } else if (args[0] === 'on') {
                    db_notifbc.splice(getBroadcastPosition(from), 1)
                    fs.writeFileSync('./lib/database/user/notif_broadcast.json', JSON.stringify(db_notifbc))
                    reply(`Done. Anda sekarang akan mendapatkan notifikasi dari bot tentang pembaruan bot dan lainnya, bila ingin mematikan ketik${prefix}notifbc off`)
                }
                break
            case 'add':
                if (!isGroup) return reply(mess.only.group)
                // if (!isGroupAdmins) return reply(mess.only.adminGroup)
                if (!isBotGroupAdmins) return reply(mess.only.Botadmin)
                if (args.length < 1) return reply('yang mau di add jin ya? :v')
                if (args[0].startsWith('08')) return reply('Gunakan kode negara kak')
                try {
                    let num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
                    conn.groupAdd(from, [num])
                } catch (error) {
                    console.log('error :', error)
                    reply('Gagal Menambahkan Target, mungkin karena di private')
                }
                break
            case 'kick':
                if (!isGroup) return reply(mess.only.group)
                if (!isGroupAdmins) return reply(mess.only.adminGroup)
                if (!isBotGroupAdmins) return reply(mess.only.Botadmin)
                if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target yang ingin di tendang!')
                mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
                if (mentioned.length > 1) {
                    teks = 'Perintah di terima, mengeluarkan :\n'
                    for (let _ of mentioned) {
                        teks += `@${_.split('@')[0]}\n`
                    }
                    mentions(teks, mentioned, true)
                    conn.groupRemove(from, mentioned)
                } else {
                    mentions(`Perintah di terima, mengeluarkan : @${mentioned[0].split('@')[0]}`, mentioned, true)
                    conn.groupRemove(from, mentioned)
                }
                break
            case 'edotensei':
                if (!isGroup) return reply(mess.only.group)
                if (!isGroupAdmins) return reply(mess.only.adminGroup)
                if (!isBotGroupAdmins) return reply(mess.only.Botadmin)
                if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target yang ingin di tendang!')
                let num = mek.message.extendedTextMessage.contextInfo.mentionedJid
                mentions(`Perintah di terima, mengeluarkan : @${num[0].split('@')[0]}`, mentioned, true)
                conn.groupRemove(from, num)
                await sleep(8000)
                try {
                    conn.groupAdd(from, num)
                } catch (error) {
                    console.log('error :', error)
                    reply('Gagal Menambahkan Target, mungkin karena di private')
                }
                break
            case 'jadian':
                if (!isGroup) return reply('perintah ini hanya dapat digunakan di dalam grup')
                const membergroup = await groupMembers
                // const groupmember = groupnya
                const aku = membergroup[Math.floor(Math.random() * membergroup.length)];
                const kamu = membergroup[Math.floor(Math.random() * membergroup.length)];
                const sapa = `Cieee... @${aku.jid.replace(/@s.whatsapp.net/g, '')} 💘 @${kamu.jid.replace(/[@s.whatsapp.net]/g, '')} baru jadian nih\nBagi pj nya dong`
                await conn.sendMessage(from, sapa, text, { contextInfo: { "mentionedJid": [aku.jid, kamu.jid] } })
                break
            case 'delvote':
                if (!mek.key.remoteJid) return
                if (isVote) return reply('Tidak ada sesi Voting')
                delVote(from)
                reply('Sukses Menghapus sesi Voting Di Grup Ini')
                break
            case 'voting':
                if (!isGroupAdmins && !mek.key.fromMe) return
                if (!isGroup) return reply(mess.only.group)
                if (isVote) return reply('Sesi Voting Sedang Berlangsung Di Grup Ini')
                if (!q) return reply('*Voting*\n\n' + prefix + 'voting @tag target | reason  | 1 (1 = 1 Menit)')
                if (mek.message.extendedTextMessage.contextInfo.mentionedJid.length > 0 || mek.message.extendedTextMessage.contextInfo == null) {
                    let id = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
                    split = args.join(' ').replace('@', '').split('|')
                    if (!Number(split[2])) return reply('masukan angka di baris ke 3\nContoh: 1-9999\n1 = 1 Menit')
                    await mentions('Vote ' + '@' + id.split('@')[0] + ' Di Mulai' + '\n\n' + `vote = ✅\ndevote = ❌\n\nAlasan: ${split[1]}`, [id], true)
                    addVote(from, split[1], split[0], split[2], reply)
                }
                break
            case 'linkwa':
                if (!q) return reply('cari group apa?')
                hx.linkwa(q)
                    .then(result => {
                        let res = '*「 _LINK WA_ 」*\n\n'
                        for (let i of result) {
                            res += `*Nama*: *${i.nama}\n*Link*: ${i.link}\n\n`
                        }
                        reply(res)
                    })
                    .catch(err => {
                        reply('error coba di ulang')
                    })
                break
            case 'igstory':
                if (!q) return reply('Usernamenya?')
                hx.igstory(q)
                    .then(async result => {
                        for (let i of result.medias) {
                            if (i.url.includes('mp4')) {
                                let link = await getBuffer(i.url)
                                conn.sendMessage(from, link, video, { quoted: mek, caption: `Type : ${i.type}` })
                            } else {
                                let link = await getBuffer(i.url)
                                conn.sendMessage(from, link, image, { quoted: mek, caption: `Type : ${i.type}` })
                            }
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        reply('Username tidak ada!')
                    })
                break
            case 'caripesan':
                if (!q) return reply('pesannya apa bang?')
                let v = await conn.searchMessages(q, from, 10, 1)
                let s = v.messages
                let el = s.filter(v => v.message)
                el.shift()
                try {
                    if (el[0].message.conversation == undefined) return
                    reply(`Ditemukan ${el.length} pesan`)
                    await sleep(3000)
                    for (let i = 0; i < el.length; i++) {
                        await conn.sendMessage(from, 'Nih pesannya', text, { quoted: el[i] })
                    }
                } catch (e) {
                    reply('Pesan tidak ditemukan!')
                }
                break
            case 'lirik':
                if (!q) return reply('lagu apa?')
                try {
                    let song = await hx.lirik(q)
                    sendMediaURL(from, song.thumb, song.lirik)
                } catch (err) {
                    console.log('Error : ' + err);
                }
                break
            case 'otaku':
                if (!q) return reply('judul animenya?')
                try {
                    let anime = await hx.otakudesu(q)
                    rem = `*Judul* : ${anime.judul}
*Jepang* : ${anime.jepang}
*Rating* : ${anime.rate}
*Produser* : ${anime.produser}
*Status* : ${anime.status}
*Episode* : ${anime.episode}
*Durasi* : ${anime.durasi}
*Rilis* : ${anime.rilis}
*Studio* : ${anime.studio}
*Genre* : ${anime.genre}\n
*Sinopsis* :
${anime.desc}\n\n*Link Batch* : ${anime.batch}\n*Link Download SD* : ${anime.batchSD}\n*Link Download HD* : ${anime.batchHD}`
                    ram = await getBuffer(anime.img)
                    conn.sendMessage(from, ram, image, { quoted: mek, caption: rem })
                } catch (err) {
                    console.log(`Error :`, err)
                    reply('Anime tidak ditemukan!')
                }
                break
            case 'komiku':
                if (!q) return reply(`judulnya?\n${prefix}komiku mao gakuin`)
                try {
                    let komik = await hx.komiku(q)
                    result = `*Title* : ${komik.title}\n
*Title Indo* : ${komik.indo}\n
*Update* : ${komik.update}\n
*Desc* : ${komik.desc}\n
*Chapter Awal* : ${komik.chapter_awal}
*Chapter Akhir* : ${komik.chapter_akhir}`
                    sendMediaURL(from, komik.image, result)
                } catch (err) {
                    console.log(err)
                    reply('Komik tidak ditemukan!')
                }
                break
            case 'chara':
                if (!q) return reply(`gambar apa?\n${prefix}chara nino`)
                try {
                    let im = await hx.chara(q)
                    let acak = im[Math.floor(Math.random() * im.length)]
                    let li = await getBuffer(acak)
                    await conn.sendMessage(from, li, image, { quoted: mek })
                } catch (err) {
                    console.log(err);
                    reply('Chara tidak ditemukan!')
                }
                break
            case 'pinterest':
                if (!q) return reply('gambar apa?')
                try {
                    let pin = await hx.pinterest(q)
                    let ac = pin[Math.floor(Math.random() * pin.length)]
                    let di = await getBuffer(ac)
                    await conn.sendMessage(from, di, image, { quoted: mek })
                } catch (err) {
                    console.log(err);
                    reply('Gambar tidak ditemukan!')
                }
                break
            case 'playstore':
                if (!q) return reply('lu nyari apa?')
                try {
                    let play = await hx.playstore(q)
                    let store = '❉─────────────────────❉\n'
                    for (let i of play) {
                        store += `\n*「 _PLAY STORE_ 」*\n
- *Nama* : ${i.name}
- *Link* : ${i.link}\n
- *Dev* : ${i.developer}
- *Link Dev* : ${i.link_dev}\n❉─────────────────────❉`
                    }
                    reply(store)
                } catch (err) {
                    console.log(err);
                    reply('Ada masalah!')
                }
                break
            case 'kontag':
                if (!mek.key.fromMe && !isOwner) return reply('SELF-BOT')
                pe = args.join('')
                entah = pe.split('|')[0]
                nah = pe.split('|')[1]
                if (isNaN(entah)) return reply('Invalid phone number');
                members_ids = []
                for (let mem of groupMembers) {
                    members_ids.push(mem.jid)
                }
                vcard = 'BEGIN:VCARD\n'
                    + 'VERSION:3.0\n'
                    + `FN:${nah}\n`
                    + `TEL;type=CELL;type=VOICE;waid=${entah}:${phoneNum('+' + entah).getNumber('internasional')}\n`
                    + 'END:VCARD'.trim()
                conn.sendMessage(from, { displayName: `${nah}`, vcard: vcard }, contact, { contextInfo: { "mentionedJid": members_ids } })
                break
            case 'sticktag':
                if (!fromMe && !isOwner) return ('Khusus Owner!!')
                if ((isMedia && !mek.message.videoMessage || isQuotedSticker) && args.length == 0) {
                    encmedia = isQuotedSticker ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                    file = await conn.downloadAndSaveMediaMessage(encmedia, filename = getRandom())
                    value = args.join(" ")
                    var group = await conn.groupMetadata(from)
                    var member = group['participants']
                    var mem = []
                    member.map(async adm => {
                        mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
                    })
                    var options = {
                        contextInfo: { mentionedJid: mem },
                        quoted: mek
                    }
                    ini_buffer = fs.readFileSync(file)
                    conn.sendMessage(from, ini_buffer, sticker, options)
                    fs.unlinkSync(file)
                } else {
                    reply(`*Reply sticker yang sudah dikirim*`)
                }
                break
            case 'totag':
                if ((isMedia && !mek.message.videoMessage || isQuotedSticker) && args.length == 0) {
                    encmedia = isQuotedSticker ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                    file = await conn.downloadAndSaveMediaMessage(encmedia, filename = getRandom())
                    value = args.join(" ")
                    var group = await conn.groupMetadata(from)
                    var member = group['participants']
                    var mem = []
                    member.map(async adm => {
                        mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
                    })
                    var options = {
                        contextInfo: { mentionedJid: mem },
                        quoted: mek
                    }
                    ini_buffer = fs.readFileSync(file)
                    conn.sendMessage(from, ini_buffer, sticker, options)
                    fs.unlinkSync(file)
                } else if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
                    encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                    file = await conn.downloadAndSaveMediaMessage(encmedia, filename = getRandom())
                    value = args.join(" ")
                    var group = await conn.groupMetadata(from)
                    var member = group['participants']
                    var mem = []
                    member.map(async adm => {
                        mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
                    })
                    var options = {
                        contextInfo: { mentionedJid: mem },
                        quoted: mek
                    }
                    ini_buffer = fs.readFileSync(file)
                    conn.sendMessage(from, ini_buffer, image, options)
                    fs.unlinkSync(file)
                } else if ((isMedia && !mek.message.videoMessage || isQuotedAudio) && args.length == 0) {
                    encmedia = isQuotedAudio ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                    file = await conn.downloadAndSaveMediaMessage(encmedia, filename = getRandom())
                    value = args.join(" ")
                    var group = await conn.groupMetadata(from)
                    var member = group['participants']
                    var mem = []
                    member.map(async adm => {
                        mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
                    })
                    var options = {
                        mimetype: 'audio/mp4',
                        ptt: true,
                        contextInfo: { mentionedJid: mem },
                        quoted: mek
                    }
                    ini_buffer = fs.readFileSync(file)
                    conn.sendMessage(from, ini_buffer, audio, options)
                    fs.unlinkSync(file)
                } else if ((isMedia && !mek.message.videoMessage || isQuotedVideo) && args.length == 0) {
                    encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                    file = await conn.downloadAndSaveMediaMessage(encmedia, filename = getRandom())
                    value = args.join(" ")
                    var group = await conn.groupMetadata(from)
                    var member = group['participants']
                    var mem = []
                    member.map(async adm => {
                        mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
                    })
                    var options = {
                        mimetype: 'video/mp4',
                        contextInfo: { mentionedJid: mem },
                        quoted: mek
                    }
                    ini_buffer = fs.readFileSync(file)
                    conn.sendMessage(from, ini_buffer, video, options)
                    fs.unlinkSync(file)
                } else {
                    reply(`reply gambar/sticker/audio/video dengan caption ${prefix}totag`)
                }
                break
            case 'fitnah':
                if (!isPremium && !isOwner) return
                if (args.length < 1) return reply(`Usage :\n${prefix}fitnah [@tag|pesan|balasanbot]]\n\nEx : \n${prefix}fitnah @tagmember|hai|hai juga`)
                var gh = args.join('')
                mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
                var replace = gh.split("|")[0];
                var target = gh.split("|")[1];
                var bot = gh.split("|")[2];
                conn.sendMessage(from, `${bot}`, text, { quoted: { key: { fromMe: false, participant: `${mentioned}`, ...(from ? { remoteJid: from } : {}) }, message: { conversation: `${target}` } } })
                break
            case 'settarget':
                if (!q) return reply(`${prefix}settarget 628xxxxx`)
                targetpc = args[0]
                fakegroup(`Succes Mengganti target fitnahpc : ${targetpc}`)
                break
            case 'fitnahpc':
                if (!q) return reply(`${prefix}fitnahpc teks target|teks lu`)
                jids = `${targetpc}@s.whatsapp.net` // nomer target
                var split = args.join(' ').replace(/@|\d/gi, '').split('|')
                var taged = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
                var options = { contextInfo: { quotedMessage: { extendedTextMessage: { text: split[0] } } } }
                const responye = await conn.sendMessage(jids, `${split[1]}`, MessageType.text, options)
                await conn.deleteMessage(jids, { id: responye.messageID, remoteJid: jids, fromMe: true })
                break

            /* Feature Convert */
            case 'tomp3':
                if (!isQuotedVideo) return fakegroup('Reply videonya!')
                fakegroup(mess.wait)
                encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                media = await conn.downloadAndSaveMediaMessage(encmedia)
                ran = getRandom('.mp4')
                exec(`ffmpeg -i ${media} ${ran}`, (err) => {
                    fs.unlinkSync(media)
                    if (err) return fakegroup(`Err: ${err}`)
                    buffer453 = fs.readFileSync(ran)
                    conn.sendMessage(from, buffer453, audio, { mimetype: 'audio/mp4', quoted: mek })
                    fs.unlinkSync(ran)
                })
                break
            case 'tomp4':
                if ((isMedia && !mek.message.videoMessage || isQuotedSticker) && args.length == 0) {
                    ger = isQuotedSticker ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                    owgi = await conn.downloadAndSaveMediaMessage(ger)
                    webp2gifFile(owgi).then(res => {
                        sendMediaURL(from, res.result, 'Done')
                    })
                } else {
                    reply('reply stiker')
                }
                fs.unlinkSync(owgi)
                break
            case 'tourl':
                if ((isMedia && !mek.message.videoMessage || isQuotedImage || isQuotedVideo) && args.length == 0) {
                    boij = isQuotedImage || isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                    owgi = await conn.downloadMediaMessage(boij)
                    res = await upload(owgi)
                    reply(res)
                } else {
                    reply('kirim/reply gambar/video')
                }
                break
            case 'fast':
                if (!isQuotedVideo) return fakegroup('Reply videonya!')
                fakegroup(mess.wait)
                encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                media = await conn.downloadAndSaveMediaMessage(encmedia)
                ran = getRandom('.mp4')
                exec(`ffmpeg -i ${media} -filter_complex "[0:v]setpts=0.5*PTS[v];[0:a]atempo=2[a]" -map "[v]" -map "[a]" ${ran}`, (err) => {
                    fs.unlinkSync(media)
                    if (err) return fakegroup(`Err: ${err}`)
                    buffer453 = fs.readFileSync(ran)
                    conn.sendMessage(from, buffer453, video, { mimetype: 'video/mp4', quoted: mek })
                    fs.unlinkSync(ran)
                })
                break
            case 'slow':
                if (!isQuotedVideo) return fakegroup('Reply videonya!')
                fakegroup(mess.wait)
                encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                media = await conn.downloadAndSaveMediaMessage(encmedia)
                ran = getRandom('.mp4')
                exec(`ffmpeg -i ${media} -filter_complex "[0:v]setpts=2*PTS[v];[0:a]atempo=0.5[a]" -map "[v]" -map "[a]" ${ran}`, (err) => {
                    fs.unlinkSync(media)
                    if (err) return fakegroup(`Err: ${err}`)
                    buffer453 = fs.readFileSync(ran)
                    conn.sendMessage(from, buffer453, video, { mimetype: 'video/mp4', quoted: mek })
                    fs.unlinkSync(ran)
                })
                break
            case 'reverse':
                if (!isQuotedVideo) return fakegroup('Reply videonya!')
                encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                media = await conn.downloadAndSaveMediaMessage(encmedia)
                ran = getRandom('.mp4')
                exec(`ffmpeg -i ${media} -vf reverse -af areverse ${ran}`, (err) => {
                    fs.unlinkSync(media)
                    if (err) return fakegroup(`Err: ${err}`)
                    buffer453 = fs.readFileSync(ran)
                    conn.sendMessage(from, buffer453, video, { mimetype: 'video/mp4', quoted: mek })
                    fs.unlinkSync(ran)
                })
                break
            case 'toimg':
                if (!isQuotedSticker) return reply('𝗥𝗲𝗽𝗹𝘆/𝘁𝗮𝗴 𝘀𝘁𝗶𝗰𝗸𝗲𝗿 !')
                reply(mess.wait)
                encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                media = await conn.downloadAndSaveMediaMessage(encmedia)
                ran = getRandom('.png')
                exec(`ffmpeg -i ${media} ${ran}`, (err) => {
                    fs.unlinkSync(media)
                    if (err) return reply('Yah gagal, coba ulangi ^_^')
                    buffer = fs.readFileSync(ran)
                    sendImage(buffer, 'NIH')
                    fs.unlinkSync(ran)
                })
                break
            case 'kontak':
                if (!q) return reply(`Ketik ${prefix}kontak nomornya|namanya\nContoh: ${prefix}kontak 628815268728|Testing`)
                pe = args.join(' ')
                entah = pe.split('|')[0]
                nah = pe.split('|')[1]
                if (isNaN(entah)) return reply('Invalid phone number');
                vcard = 'BEGIN:VCARD\n'
                    + 'VERSION:3.0\n'
                    + `FN:${nah}\n`
                    + `TEL;type=CELL;type=VOICE;waid=${entah}:${phoneNum('+' + entah).getNumber('internasional')}\n`
                    + 'END:VCARD'.trim()
                conn.sendMessage(from, { displayName: `${nah}`, vcard: vcard }, contact)
                break

            /* Feature maker & Sticker */
            case 'take':
            case 'colong':
                if (!isQuotedSticker) return reply('Stiker aja om')
                encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                media = await conn.downloadAndSaveMediaMessage(encmedia)
                anu = args.join(' ').split('|')
                satu = anu[0] !== '' ? anu[0] : `SELF`
                dua = typeof anu[1] !== 'undefined' ? anu[1] : `BOT`
                require('./lib/fetcher.js').createExif(satu, dua)
                require('./lib/fetcher.js').modStick(media, conn, mek, from)
                break
            case 'sticker':
            case 'stiker':
            case 's':
                createExif('Staz', 'Bot')
                if (isMedia && !mek.message.videoMessage || isQuotedImage) {
                    reply(mess.wait)
                    const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                    const media = await conn.downloadAndSaveMediaMessage(encmedia, `./stik/${sender}`)
                    await ffmpeg(`${media}`)
                        .input(media)
                        .on('start', function (cmd) {
                            console.log(`Started : ${cmd}`)
                        })
                        .on('error', function (err) {
                            console.log(`Error : ${err}`)
                            fs.unlinkSync(media)
                            reply('error')
                        })
                        .on('end', function () {
                            console.log('Finish')
                            exec(`webpmux -set exif ./stik/data.exif ./stik/${sender}.webp -o ./stik/${sender}.webp`, async (error) => {
                                if (error) return reply(mess.error.stick)
                                sendSticker(from, fs.readFileSync(`./stik/${sender}.webp`), mek)
                                setTimeout(() => {
                                    fs.unlinkSync(media)
                                    fs.unlinkSync(`./stik/${sender}.webp`)
                                }, 2000);
                            })
                        })
                        .addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
                        .toFormat('webp')
                        .save(`./stik/${sender}.webp`)
                } else if ((isMedia && mek.message.videoMessage.fileLength < 10000000 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.fileLength < 10000000)) {
                    const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                    const media = await conn.downloadAndSaveMediaMessage(encmedia, `./stik/${sender}`)
                    reply(mess.wait)
                    await ffmpeg(`${media}`)
                        .inputFormat(media.split('.')[4])
                        .on('start', function (cmd) {
                            console.log(`Started : ${cmd}`)
                        })
                        .on('error', function (err) {
                            console.log(`Error : ${err}`)
                            fs.unlinkSync(media)
                            tipe = media.endsWith('.mp4') ? 'video' : 'gif'
                            //amek.reply(from, mess.error.api, mek)
                            reply(mess.error.stick)
                        })
                        .on('end', function () {
                            console.log('Finish')
                            exec(`webpmux -set exif ./stik/data.exif ./stik/${sender}.webp -o ./stik/${sender}.webp`, async (error) => {
                                if (error) return reply(mess.error.stick)
                                sendSticker(from, fs.readFileSync(`./stik/${sender}.webp`), mek)
                                setTimeout(() => {
                                    fs.unlinkSync(media)
                                    fs.unlinkSync(`./stik/${sender}.webp`)
                                }, 2000);
                            })
                        })
                        .addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
                        .toFormat('webp')
                        .save(`./stik/${sender}.webp`)
                } else {
                    reply(`Kirim gambar/video dengan caption ${prefix}sticker atau tag gambar/video yang sudah dikirim\nNote : Durasi video maximal 10 detik`)
                }
                break
            case 'stikerwm':
            case 'stickerwm':
            case 'swm':
                pe = args.join('')
                var a = pe.split("|")[0];
                var b = pe.split("|")[1];
                if (isMedia && !mek.message.videoMessage || isQuotedImage) {
                    const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                    media = await conn.downloadAndSaveMediaMessage(encmedia)
                    await createExif(a, b)
                    out = getRandom('.webp')
                    ffmpeg(media)
                        .on('error', (e) => {
                            console.log(e)
                            conn.sendMessage(from, 'Terjadi kesalahan', 'conversation', { quoted: mek })
                            fs.unlinkSync(media)
                        })
                        .on('end', () => {
                            _out = getRandom('.webp')
                            spawn('webpmux', ['-set', 'exif', './stik/data.exif', out, '-o', _out])
                                .on('exit', () => {
                                    conn.sendMessage(from, fs.readFileSync(_out), 'stickerMessage', { quoted: mek })
                                    setTimeout(() => {
                                        fs.unlinkSync(out)
                                        fs.unlinkSync(_out)
                                        fs.unlinkSync(media)
                                    }, 2000);
                                })
                        })
                        .addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
                        .toFormat('webp')
                        .save(out)
                } else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
                    const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                    const media = await conn.downloadAndSaveMediaMessage(encmedia)
                    pe = args.join('')
                    var a = pe.split("|")[0];
                    var b = pe.split("|")[1];
                    await createExif(a, b)
                    out = getRandom('.webp')
                    ffmpeg(media)
                        .on('error', (e) => {
                            console.log(e)
                            conn.sendMessage(from, 'Terjadi kesalahan', 'conversation', { quoted: mek })
                            fs.unlinkSync(media)
                        })
                        .on('end', () => {
                            _out = getRandom('.webp')
                            spawn('webpmux', ['-set', 'exif', './stik/data.exif', out, '-o', _out])
                                .on('exit', () => {
                                    conn.sendMessage(from, fs.readFileSync(_out), 'stickerMessage', { quoted: mek })
                                    setTimeout(() => {
                                        fs.unlinkSync(out)
                                        fs.unlinkSync(_out)
                                        fs.unlinkSync(media)
                                    }, 2000);
                                })
                        })
                        .addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
                        .toFormat('webp')
                        .save(out)
                } else {
                    reply(`Kirim gambar dengan caption ${prefix}swm teks|teks atau tag gambar yang sudah dikirim`)
                }
                break
            case 'emoji':
                if (!q) return fakegroup('emojinya?')
                qes = args.join(' ')
                emoji.get(`${qes}`).then(emoji => {
                    teks = `${emoji.images[4].url}`
                    sendStickerFromUrl(from, `${teks}`)
                    console.log(teks)
                })
                break

            /* Feature Self-Bot & Owner-Bot */
            case 'upswteks':
                if (!fromMe && !isOwner) return reply('Fitur Khusus khusus Owner!!')
                if (!q) return fakestatus('Isi teksnya!')
                conn.sendMessage('status@broadcast', `${q}`, extendedText)
                fakegroup(`Sukses Up story wea teks ${q}`)
                break
            case 'upswimage':
                if (!fromMe && !isOwner) return reply('Fitur Khusus Owner!!')
                if (isQuotedImage) {
                    const swsw = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                    cihcih = await conn.downloadMediaMessage(swsw)
                    conn.sendMessage('status@broadcast', cihcih, image, { caption: `${q}` })
                    bur = `Sukses Upload Story Image dengan Caption: ${q}`
                    conn.sendMessage(from, bur, text, { quoted: mek })
                } else {
                    fakestatus('Reply gambarnya!')
                }
                break
            case 'upswvideo':
                if (!fromMe && !isOwner) return reply('Fitur Khusus Owner!!')
                if (isQuotedVideo) {
                    const swsw = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                    cihcih = await conn.downloadMediaMessage(swsw)
                    conn.sendMessage('status@broadcast', cihcih, video, { caption: `${q}` })
                    bur = `Sukses Upload Story Video dengan Caption: ${q}`
                    conn.sendMessage(from, bur, text, { quoted: mek })
                } else {
                    fakestatus('reply videonya!')
                }
                break
            case 'fdeface':
                if (!fromMe && !isOwner) return reply('Fitur khusus Owner')
                ge = args.join('')
                var pe = ge.split("|")[0];
                var pen = ge.split("|")[1];
                var pn = ge.split("|")[2];
                var be = ge.split("|")[3];
                const fde = `kirim/reply image dengan capion ${prefix}fdeface link|title|desc|teks`
                if (args.length < 1) return reply(fde)
                const dipes = isQuotedSticker || isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                const tipes = await conn.downloadAndSaveMediaMessage(dipes)
                const bufer = fs.readFileSync(tipes)
                const desc = `${pn}`
                const title = `${pen}`
                const url = `${pe}`
                const buu = `https://${be}`
                var anu = {
                    detectLinks: false
                }
                var mat = await conn.generateLinkPreview(url)
                mat.title = title;
                mat.description = desc;
                mat.jpegThumbnail = bufer;
                mat.canonicalUrl = buu;
                conn.sendMessage(from, mat, MessageType.extendedText, anu)
                break
            case 'public':
                if (!mek.key.fromMe && !isOwner) return fakestatus('Fitur Khusus Owner!!')
                if (banChats === false) return
                // var taged = ben.message.extendedTextMessage.contextInfo.mentionedJid[0]
                setting.banChats = false
                banChats = false
                fs.writeFileSync('./setting.json', JSON.stringify(setting, null, 2))
                fakestatus(`「 *PUBLIC-MODE* 」`)
                break
            case 'self':
                if (!mek.key.fromMe && !isOwner) return fakestatus('Fitur Khusus Owner!!')
                if (setting.banChats === true) return
                setting.banChats = true
                uptime = process.uptime()
                // var taged = ben.message.extendedTextMessage.contextInfo.mentionedJid[0]
                banChats = true
                fs.writeFileSync('./setting.json', JSON.stringify(setting, null, 2))
                fakestatus(`「 *SELF-MODE* 」`)
                break
            case 'selfbot':
                if (!isOwner) return reply('fitur khusus Owner')
                if (args[0] === 'on') {
                    if (setting.selfbot === true) return
                    setting.selfbot = true
                    selfbot = true
                    fs.writeFileSync('./setting.json', JSON.stringify(setting, null, 2))
                    fakestatus(`「 *SELF-MODE ON* 」`)
                } else if (args[0] === 'off') {
                    if (setting.selfbot === false) return
                    setting.selfbot = false
                    selfbot = false
                    fs.writeFileSync('./setting.json', JSON.stringify(setting, null, 2))
                    fakestatus(`「 *SELF-MODE OFF* 」`)
                } else {
                    reply(`ketik ${prefix}selfbot on/off`)
                }
                break
            case 'chatread':
                if (!isOwner) return reply('Fitur khusus Owner')
                if (args[0] === 'on') {
                    if (setting.chatRead === true) return
                    setting.ChatRead = true
                    ChatRead = true
                    fs.writeFileSync('./setting.json', JSON.stringify(setting, null, 2))
                    fakestatus('「 *CHAT-READ ON* 」')
                } else if (args[0] === 'off') {
                    if (setting.chatRead === false)
                        setting.ChatRead = false
                    ChatRead = false
                    fs.writeFileSync('./setting.json', JSON.stringify(setting, null, 2))
                    fakestatus('「 *CHAT-READ OFF* 」')
                } else {
                    reply(`Ketik ${prefix}chatread on/off`)
                }
                break
            case 'prefix':
                // if (!isOwner) return reply('Fitur khusus Owner')
                if (args[0] === 'multi') {
                    if (setting.single_multi === true) return
                    setting.single_multi = true
                    single_multi = true
                    fs.writeFileSync('./setting.json', JSON.stringify(setting, null, 2))
                    fakestatus('「 *MULTI-PREFIX* 」')
                } else if (args[0] === 'single') {
                    if (setting.single_multi === false)
                        setting.single_multi = false
                    single_multi = false
                    fs.writeFileSync('./setting.json', JSON.stringify(setting, null, 2))
                    fakestatus(`「 *SINGLE-PREFIX* 」
Prefix : ${singleprefix}
                `)
                } else {
                    reply(`Ketik ${prefix}prefix multi/single`)
                }
                break
            case 'setreply':
            case 'setfake':
                if (!fromMe && !isOwner) return
                if (!q) return fakegroup(mess.wrongFormat)
                fake = q
                fakegroup(`Succes Mengganti Conversation Fake : ${q}`)
                break
            case 'setfakeimg':
                if (!fromMe && !isOwner) return reply('Fitur Khusus Owner')
                if ((isMedia && !mek.message.videoMessage || isQuotedImage || isQuotedSticker) && args.length == 0) {
                    boij = isQuotedImage || isQuotedSticker ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                    delb = await conn.downloadMediaMessage(boij)
                    fs.writeFileSync(`./stik/fake.jpeg`, delb)
                    fakestatus('Sukses')
                } else {
                    reply(`Kirim gambar dengan caption ${prefix}sethumb`)
                }
                break
            case 'setthumb':
                if (!fromMe && !isOwner) return reply('Fitur Khusus Owner')
                if ((isMedia && !mek.message.videoMessage || isQuotedImage || isQuotedSticker) && args.length == 0) {
                    boij = isQuotedImage || isQuotedSticker ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                    delb = await conn.downloadMediaMessage(boij)
                    fs.writeFileSync(`./stik/thumb.jpeg`, delb)
                    fakestatus('Sukses')
                } else {
                    reply(`Kirim gambar dengan caption ${prefix}sethumb`)
                }
                break
            case 'sewa':
                if (!isOwner && !fromMe) return reply('Fitur khusu owner kak!')
                if (args[0] === 'add') {
                    // if (!isUrl(args[1]) && !args[1].includes('whatsapp.com')) return reply(mess.error.Iv)
                    const linkwa = args[1]
                    if (linkwa.includes('https://chat.whatsapp.com')) {
                        const linkk = linkwa.split('https://chat.whatsapp.com/')[1]
                        if (!linkk) return reply('pastikan itu link https://whatsapp.com/')
                        const resultlink = await conn.query({
                            json: ["query", "invite", linkk],
                            expect200: true
                        })
                        const { id, subject } = resultlink
                        await conn.acceptInvite(linkk)
                        await reply('Oke. Siap masuk ke grup yang di sewa')
                        await sendText(id, `Hello!! I was invited by ${pushname}\n\nSilahkan ketik${prefix}menu untuk melihat menu bot`)
                        console.log(`id: ${id}\nSubject: ${subject}`)
                        sewa.addSewaGroup(id, subject, args[2], dbsewa)
                        await sendText(groupId, 'Terima Kasih sudah menyewa bot kami, Semoga bermanfaat di grup ini ☺')
                        await sendText(id, `*「 SEWA ADDED 」*\n\n➸ *ID*: ${id}\n➸ *Expired*: ${ms(toMs(args[2])).days} day(s) ${ms(toMs(args[2])).hours} hour(s) ${ms(toMs(args[2])).minutes} minute(s)\n\nBot Akan Keluar Secara Otomatis\nDalam waktu yang sudah di tentukan`)
                        await sendContact(id, 'Wahyu', ownerNumber[0].replace('@s.whatsapp.net', ''))
                        await sendText(id, `*CHAT OWNER JIKA INGIN PERPANJANG DURASI ATAU SEWA BOT*`)
                        await sendText(ownerNumber[0], `Sukses Menyewakan bot kedalam grup ${subject}\nSalin ID Dibawah Untuk Mendelete Sewaan Di Grup Tersebut\nDengan Ketik /sewa del IDnya`)
                        await sendText(ownerNumber[0], 'IDGroup : ' + id)
                    } else if (groupId) {
                        const { subject } = await conn.fetchGroupMetadataFromWA(groupId)
                        sewa.addSewaGroup(groupId, subject, args[1], dbsewa)
                        await sendText(groupId, 'Terima Kasih sudah menyewa bot kami, Semoga bermanfaat di grup ini ☺')
                        await sendText(groupId, `*「 SEWA ADDED 」*\n\n➸ *ID*: ${groupId}\n➸ *Expired*: ${ms(toMs(args[1])).days} day(s) ${ms(toMs(args[1])).hours} hour(s) ${ms(toMs(args[1])).minutes} minute(s)\n\nBot Akan Keluar Secara Otomatis\nDalam waktu yang sudah di tentukan`)
                        await sendContact(groupId, 'Wahyu', ownerNumber[0].replace('@s.whatsapp.net', ''))
                        await sendText(groupId, `*CHAT OWNER JIKA INGIN PERPANJANG DURASI ATAU SEWA BOT*`)
                        await sendText(ownerNumber[0], `Sukses Menyewakan bot kedalam grup ${groupName}\nSalin ID Dibawah Untuk Mendelete Sewaan Di Grup Tersebut\nDengan Ketik /sewa del IDnya`)
                        await sendText(ownerNumber[0], 'IDGroup : ' + groupId)
                    }
                } else if (args[0] === 'del') if (groupId) {
                    dbsewa.splice(sewa.getSewaPosition(groupId, dbsewa), 1)
                    fs.writeFileSync('./lib/database/group/sewa.json', JSON.stringify(dbsewa))
                    await sendText(from, 'Sayonara')
                    setTimeout(() => {
                        conn.groupLeave(groupId)
                    }, 2000);
                } else if (args[1]) {
                    dbsewa.splice(sewa.getSewaPosition(args[1], dbsewa), 1)
                    fs.writeFileSync('./lib/database/group/sewa.json', JSON.stringify(dbsewa))
                    await sendText(args[1], mess.botout)
                    setTimeout(() => {
                        conn.groupLeave(args[1])
                    }, 2000);
                }
                break
            case 'premium':
                if (!isOwner && !fromMe) return await reply('Khusus Owner Bot!!')
                if (args.length !== 3) return await reply('Format Salah!')
                if (args[0] === 'add') {
                    try {
                        const mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
                        if (mentioned.length !== 0) {
                            // for (let benet of mentioned) {
                            if (mentioned === botNumber) return await reply('Format Salah!')
                            premium.addPremiumUser(mentioned, args[2], dbpremium)
                            await reply(`*「 PREMIUM ADDED 」*\n\n➸ *ID*: ${mentioned}\n➸ *Expired*: ${ms(toMs(args[2])).days} day(s) ${ms(toMs(args[2])).hours} hour(s) ${ms(toMs(args[2])).minutes} minute(s)`)
                            // }
                        }
                    } catch {
                        premium.addPremiumUser(args[1] + '@s.whatsapp.net', args[2], dbpremium)
                        await reply(`*「 PREMIUM ADDED 」*\n\n➸ *ID*: ${args[1]}@c.us\n➸ *Expired*: ${ms(toMs(args[2])).days} day(s) ${ms(toMs(args[2])).hours} hour(s) ${ms(toMs(args[2])).minutes} minute(s)`)
                    }
                } else if (args[0] === 'del') {
                    try {
                        const mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
                        if (mentioned.length !== 0) {
                            // if (mentioned === botNumber) return await reply('Format Salah!')
                            dbpremium.splice(premium.getPremiumPosition(senderid, dbpremium), 1)
                            fs.writeFileSync('./lib/database/user/premium.json', JSON.stringify(dbpremium))
                            await reply('Delete Done✅')
                        }
                    } catch {
                        dbpremium.splice(premium.getPremiumPosition(args[1] + '@s.whatsapp.net', dbpremium), 1)
                        fs.writeFileSync('./lib/database/user/premium.json', JSON.stringify(dbpremium))
                        await reply('Delete Done✅')
                    }
                } else {
                    await reply(`Kirim Format ${prefix}premium add/del @tagmember durasi`)
                }
                break
            case 'clearmessage':
            case 'clearmsg':
                if (!isOwner && !fromMe) return reply('Maaf ini fitur khusus owner kak!!')
                for (let i in totalchat) {
                    if (totalchat[i].jid.includes('@g.us')) {
                        // console.log(totalchat[i].jid);
                        conn.modifyChat(totalchat[i].jid, 'clear')
                    }
                }
                reply('Done clear message✅')
                break
            case 'term':
                if (!fromMe && !isOwner) return
                if (!q) return fakegroup(mess.wrongFormat)
                exec(q, (err, stdout) => {
                    if (err) return fakegroup(`SELF-BOT:~ ${err}`)
                    if (stdout) {
                        fakegroup(stdout)
                    }
                })
                break
            case 'join':
                if (!fromMe && !isOwner) return reply('Fitur Khusus Owner!!')
                try {
                    if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) return reply(mess.Iv)
                    hen = args[0]
                    if (!q) return fakestatus('Masukan link group')
                    var codeInvite = hen.split('https://chat.whatsapp.com/')[1]
                    if (!codeInvite) return fakegroup('pastikan link sudah benar!')
                    var response = await conn.acceptInvite(codeInvite)
                    fakestatus('SUKSES')
                } catch {
                    fakegroup('LINK ERROR!')
                }
                break

            /* Feature Admin group */
            case 'h':
            case 'hidetag':
                if (!mek.key.fromMe && !isOwner && !isGroupAdmins) return fakestatus('Fitur Khusus Owner!!')
                if (!isGroup) return reply(mess.only.group)
                var value = args.join(' ')
                var group = await conn.groupMetadata(from)
                var member = group['participants']
                var mem = []
                member.map(async adm => {
                    mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
                })
                var optionshidetag = {
                    text: value,
                    contextInfo: { mentionedJid: mem },
                    quoted: mek
                }
                conn.sendMessage(from, optionshidetag, text)
                break
            case 'totag':
                if ((isMedia && !mek.message.videoMessage || isQuotedSticker) && args.length == 0) {
                    encmedia = isQuotedSticker ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                    file = await conn.downloadAndSaveMediaMessage(encmedia, filename = getRandom())
                    value = args.join(" ")
                    var group = await conn.groupMetadata(from)
                    var member = group['participants']
                    var mem = []
                    member.map(async adm => {
                        mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
                    })
                    var options = {
                        contextInfo: { mentionedJid: mem },
                        quoted: mek
                    }
                    ini_buffer = fs.readFileSync(file)
                    conn.sendMessage(from, ini_buffer, sticker, options)
                    fs.unlinkSync(file)
                } else if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
                    encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                    file = await conn.downloadAndSaveMediaMessage(encmedia, filename = getRandom())
                    value = args.join(" ")
                    var group = await conn.groupMetadata(from)
                    var member = group['participants']
                    var mem = []
                    member.map(async adm => {
                        mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
                    })
                    var options = {
                        contextInfo: { mentionedJid: mem },
                        quoted: mek
                    }
                    ini_buffer = fs.readFileSync(file)
                    conn.sendMessage(from, ini_buffer, image, options)
                    fs.unlinkSync(file)
                } else if ((isMedia && !mek.message.videoMessage || isQuotedAudio) && args.length == 0) {
                    encmedia = isQuotedAudio ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                    file = await conn.downloadAndSaveMediaMessage(encmedia, filename = getRandom())
                    value = args.join(" ")
                    var group = await conn.groupMetadata(from)
                    var member = group['participants']
                    var mem = []
                    member.map(async adm => {
                        mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
                    })
                    var options = {
                        mimetype: 'audio/mp4',
                        ptt: true,
                        contextInfo: { mentionedJid: mem },
                        quoted: mek
                    }
                    ini_buffer = fs.readFileSync(file)
                    conn.sendMessage(from, ini_buffer, audio, options)
                    fs.unlinkSync(file)
                } else if ((isMedia && !mek.message.videoMessage || isQuotedVideo) && args.length == 0) {
                    encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                    file = await conn.downloadAndSaveMediaMessage(encmedia, filename = getRandom())
                    value = args.join(" ")
                    var group = await conn.groupMetadata(from)
                    var member = group['participants']
                    var mem = []
                    member.map(async adm => {
                        mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
                    })
                    var options = {
                        mimetype: 'video/mp4',
                        contextInfo: { mentionedJid: mem },
                        quoted: mek
                    }
                    ini_buffer = fs.readFileSync(file)
                    conn.sendMessage(from, ini_buffer, video, options)
                    fs.unlinkSync(file)
                } else {
                    reply(`reply gambar/sticker/audio/video dengan caption ${prefix}totag`)
                }
                break
            case 'linkgroup':
                if (!isGroup) return reply('Khusus group kak')
                if (!isGroupAdmins) return reply('Khusus admin group kak!')
                const linkgc = await conn.groupInviteCode(from)
                sendText(from, 'https://chat.whatsapp.com/' + linkgc)
                break
            case 'welcome':
                if (!isGroupAdmins) return reply('Maaf.. Fitur khusus admin grup!')
                if (args.length < 1) return reply(`Kirim perintah ${prefix}welcome on atau off`)
                if (args[0] === 'on') {
                    welcome.push(from)
                    fs.writeFileSync('./lib/database/group/welcome.json', JSON.stringify(welcome))
                    reply('Fitur Welcome telah diaktifkan')
                } else if (args[0] === 'off') {
                    welcome.splice(from, 1)
                    fs.writeFileSync('./lib/database/group/welcome.json', JSON.stringify(welcome))
                    reply('Fitur Welcome telah dimatikan')
                } else {
                    reply('Kirim perintah yang sesuai kak!')
                }
                break
            case 'delete':
            case 'd':
                if (!isGroupAdmins && !isOwner && !isPremium) return reply(mess.only.adminGroup)
                conn.deleteMessage(from,
                    {
                        id: mek.message.extendedTextMessage.contextInfo.stanzaId,
                        remoteJid: from,
                        fromMe: true
                    })
                break
            case 'sewacheck':
            case 'ceksewa':
                if (!isSewa) return await reply('Kamu belum sewa bot!')
                const cek_expired = ms(sewa.getSewaExpired(groupId, dbsewa) - Date.now())
                await reply(`*「 SEWA EXPIRED 」*\n\n➸ *ID*: ${groupId}\n➸ *Sewa left*: ${cek_expired.days} day(s) ${cek_expired.hours} hour(s) ${cek_expired.minutes} minute(s)`)
                break

            /* Feature Download */
            case 'play':
                if (args.length === 0) return reply(`Kirim perintah *${prefix}play* _Judul lagu yang akan dicari_`)
                var srch = args.join('')
                aramas = await yts(srch);
                aramat = aramas.all
                var mulaikah = aramat[0].url
                try {
                    yta(mulaikah)
                        .then((res) => {
                            const { dl_link, thumb, title, filesizeF, filesize } = res
                            axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
                                .then(async (a) => {
                                    if (Number(filesize) >= 100000) return sendMediaURL(from, thumb, `*PLAY MUSIC*\n\n*Title* : ${title}\n*Ext* : MP3\n*Filesize* : ${filesizeF}\n*Link* : ${a.data}\n\n_Untuk durasi lebih dari batas disajikan dalam mektuk link_`)
                                    const captions = ` *PLAY MUSIC*\n\n*Title* : ${title}\n*Ext* : MP3\n*Size* : ${filesizeF}\n*Link* : ${a.data}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
                                    sendMediaURL(from, thumb, captions)
                                    await sendMediaURL(from, dl_link).catch(() => reply('error'))
                                })
                        })
                } catch (err) {
                    reply(mess.error.api)
                }
                break
            case 'video':
                if (args.length === 0) return reply(`Kirim perintah *${prefix}video* _Judul lagu yang akan dicari_`)
                var srch = args.join('')
                aramas = await yts(srch);
                aramat = aramas.all
                var mulaikah = aramat[0].url
                try {
                    ytv(mulaikah)
                        .then((res) => {
                            const { dl_link, thumb, title, filesizeF, filesize } = res
                            axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
                                .then(async (a) => {
                                    if (Number(filesize) >= 100000) return sendMediaURL(from, thumb, `*PLAY VIDEO*\n\n*Title* : ${title}\n*Ext* : MP3\n*Filesize* : ${filesizeF}\n*Link* : ${a.data}\n\n_Untuk durasi lebih dari batas disajikan dalam mektuk link_`)
                                    const captions = `*PLAY VIDEO*\n\n*Title* : ${title}\n*Ext* : MP4\n*Size* : ${filesizeF}\n*Link* : ${a.data}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
                                    sendMediaURL(from, thumb, captions)
                                    await sendMediaURL(from, dl_link).catch(() => reply('error'))
                                })
                        })
                } catch (err) {
                    reply(mess.error.api)
                }
                break
            case 'ytsearch':
                if (args.length < 1) return reply('Tolong masukan query!')
                const SelfPub = banChats ? 'SELF' : 'PUBLIC'
                var srch = args.join('');
                try {
                    var aramas = await yts(srch);
                } catch {
                    return await conn.sendMessage(from, 'Error!', MessageType.text, dload)
                }
                aramat = aramas.all
                var tbuff = await getBuffer(aramat[0].image)
                var ytresult = '';
                ytresult += '「 *YOUTUBE SEARCH* 」'
                ytresult += '\n________________________\n\n'
                aramas.all.map((video) => {
                    ytresult += '❏ Title: ' + video.title + '\n'
                    ytresult += '❏ Link: ' + video.url + '\n'
                    ytresult += '❏ Durasi: ' + video.timestamp + '\n'
                    ytresult += '❏ Upload: ' + video.ago + '\n________________________\n\n'
                });
                ytresult += `◩ *${SelfPub}-BOT*`
                await fakethumb(tbuff, ytresult)
                break
            case 'ytmp4':
                if (args.length === 0) return reply(`Kirim perintah *${prefix}ytmp4 [linkYt]*`)
                let isLinks2 = args[0].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
                if (!isLinks2) return reply(mess.error.Iv)
                try {
                    reply(mess.wait)
                    ytv(args[0])
                        .then((res) => {
                            const { dl_link, thumb, title, filesizeF, filesize } = res
                            axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
                                .then((a) => {
                                    if (Number(filesize) >= 40000) return sendMediaURL(from, thumb, `*YTMP 4!*\n\n*Title* : ${title}\n*Ext* : MP3\n*Filesize* : ${filesizeF}\n*Link* : ${a.data}\n\n_Untuk durasi lebih dari batas disajikan dalam mektuk link_`)
                                    const captionsYtmp4 = `*Data Berhasil Didapatkan!*\n\n*Title* : ${title}\n*Ext* : MP4\n*Size* : ${filesizeF}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
                                    sendMediaURL(from, thumb, captionsYtmp4)
                                    sendMediaURL(from, dl_link).catch(() => reply(mess.error.api))
                                })
                        })
                } catch (err) {
                    reply(mess.error.api)
                }
                break
            case 'ytmp3':
                if (args.length === 0) return reply(`Kirim perintah *${prefix}ytmp3 [linkYt]*`)
                let isLinks = args[0].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
                if (!isLinks) return reply(mess.error.Iv)
                try {
                    reply(mess.wait)
                    yta(args[0])
                        .then((res) => {
                            const { dl_link, thumb, title, filesizeF, filesize } = res
                            axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
                                .then((a) => {
                                    if (Number(filesize) >= 30000) return sendMediaURL(from, thumb, `*Data Berhasil Didapatkan!*\n\n*Title* : ${title}\n*Ext* : MP3\n*Filesize* : ${filesizeF}\n*Link* : ${a.data}\n\n_Untuk durasi lebih dari batas disajikan dalam mektuk link_`)
                                    const captions = `*YTMP3*\n\n*Title* : ${title}\n*Ext* : MP3\n*Size* : ${filesizeF}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
                                    sendMediaURL(from, thumb, captions)
                                    sendMediaURL(from, dl_link).catch(() => reply(mess.error.api))
                                })
                        })
                } catch (err) {
                    reply(mess.error.api)
                }
                break
            case 'image':
                if (args.length < 1) return reply('Masukan teks!')
                const gimg = args.join('');
                reply(mess.wait)
                gis(gimg, async (error, result) => {
                    n = result
                    images = n[Math.floor(Math.random() * n.length)].url
                    conn.sendMessage(from, { url: images }, image, { quoted: mek })
                });
                break
            case 'tiktok':
                if (!isUrl(args[0]) && !args[0].includes('tiktok.com')) return reply(mess.Iv)
                if (!q) return fakegroup('Linknya?')
                reply(mess.wait)
                hx.ttdownloader(`${args[0]}`)
                    .then(result => {
                        const { wm, nowm, audio } = result
                        axios.get(`https://tinyurl.com/api-create.php?url=${nowm}`)
                            .then(async (a) => {
                                me = `*Link* : ${a.data}`
                                conn.sendMessage(from, { url: `${nowm}` }, video, { mimetype: 'video/mp4', quoted: mek, caption: me })
                            })
                    })
                    .catch(e => console.log(e))
                break
            case 'tiktokaudio':
                if (!isUrl(args[0]) && !args[0].includes('tiktok.com')) return reply(mess.error.Iv)
                if (!q) return fakegroup('Linknya?')
                reply(mess.wait)
                hx.ttdownloader(`${args[0]}`)
                    .then(result => {
                        const { audio } = result
                        sendMediaURL(from, audio, '')
                    })
                    .catch(e => {
                        console.log(e)
                        reply('Error kak!, coba link lain. kalo masih error chat owner!')
                    })
                break
            case 'brainly':
                if (args.length < 1) return reply('Pertanyaan apa')
                brien = args.join(' ')
                brainly(`${brien}`).then(res => {
                    teks = '❉───────────────────────❉\n'
                    for (let Y of res.data) {
                        teks += `\n*「 _BRAINLY_ 」*\n\n*➸ Pertanyaan:* ${Y.pertanyaan}\n\n*➸ Jawaban:* ${Y.jawaban[0].text}\n❉──────────────────❉\n`
                    }
                    conn.sendMessage(from, teks, text, { quoted: mek, detectLinks: false })
                })
                break
            case 'ig':
                if (!isUrl(args[0]) && !args[0].includes('instagram.com')) return reply(mess.Iv)
                if (!q) return fakegroup('Linknya?')
                reply(mess.wait)
                hx.igdl(args[0])
                    .then(async (result) => {
                        for (let i of result.medias) {
                            if (i.url.includes('mp4')) {
                                let link = await getBuffer(i.url)
                                conn.sendMessage(from, link, video, { quoted: mek, caption: `Type : ${i.type}` })
                            } else {
                                let link = await getBuffer(i.url)
                                conn.sendMessage(from, link, image, { quoted: mek, caption: `Type : ${i.type}` })
                            }
                        }
                    })
                    .catch(err => {
                        console.log(`Error : ${err}`)
                        reply('Ada masalah atau link tidak valid!, coba di ulang lagi')
                    })
                break
            case 'igstalk':
                if (!q) return fakegroup('Usernamenya?')
                ig.fetchUser(`${args.join(' ')}`)
                    .then(async (Y) => {
                        console.log(`${args.join(' ')}`)
                        ten = `${Y.profile_pic_url_hd}`
                        teks = `*ID* : ${Y.profile_id}\n*Username* : ${args.join('')}\n*Full Name* : ${Y.full_name}\n*Bio* : ${Y.biography}\n*Followers* : ${Y.followers}\n*Following* : ${Y.following}\n*Private* : ${Y.is_private}\n*Verified* : ${Y.is_verified}\n\n*Link* : https://instagram.com/${args.join('')}`
                        await sendMediaURL(from, ten, teks)
                    }).catch(async (err) => {
                        console.log(err)
                        reply('Username tidak ditemukan!')
                    })
                break
            case 'fb':
                if (!q) return reply('Mana linknya?')
                if (!isUrl(args[0]) && !args[0].includes('facebook.com')) return reply(mess.error.lv)
                reply(mess.wait)
                try {
                    const fbdown = await axios.get(`https://api.vhtear.com/fbdl?link=${q}&apikey=YADIBOTAPIKEY`)
                    const { source, VideoUrl } = fbdown.data.result
                    if (fbdown.data.result.response === 500) {
                        reply('Ada masalah!. Hubungi owner biar di fix')
                    } else {
                        const capt = `Source : ${source}\n*Link video* : ${VideoUrl}`
                        sendMediaURL(from, VideoUrl, capt)
                    }
                } catch (err) {
                    console.log(err)
                    reply('Link tidak valid!')
                }
                break
            case 'twitter':
                if (!isUrl(args[0]) && !args[0].includes('twitter.com')) return reply(mess.Iv)
                if (!q) return fakegroup('Linknya?')
                try {
                    ten = args[0]
                    var res = await hx.twitter(`${ten}`)
                    ren = `${g.HD}`
                    sendMediaURL(from, ren, 'DONE')
                } catch (err) {
                    console.log(`Error : ${err}`);
                    reply('Ada masalah, silahkan di coba lagi')
                }
                break

            // Feature Anime
            case 'anime':
                reply(mess.wait)
                fetch('https://raw.githubusercontent.com/pajaar/grabbed-results/master/pajaar-2020-gambar-anime.txt')
                    .then(res => res.text())
                    .then(body => {
                        let tod = body.split("\n");
                        let pjr = tod[Math.floor(Math.random() * tod.length)];
                        imageToBase64(pjr)
                            .then((response) => {
                                media = Buffer.from(response, 'base64');
                                conn.sendMessage(from, media, image, { quoted: mek, caption: 'NIH' })
                            })
                            .catch((error) => {
                                console.log(error);
                            })
                    });
                break
            case 'wait':
                if ((isMedia && !isVideo || isQuotedImage) && args.length == 0) {
                    reply(mess.wait)
                    const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                    const media = await conn.downloadMediaMessage(encmedia)
                    await wait(media).then(res => {
                        conn.sendMessage(from, res.video, video, { quoted: res.teks.trim() })
                    }).catch(err => {
                        reply(err)
                    })
                } else {
                    reply('Foto aja kak')
                }
                break
            case 'verify':
                const nonye = sender
                let pporang = conn.getProfilePicture(nonye)
                try {
                    pporang = await conn.getProfilePicture(nonye)
                } catch {
                    pporang = 'https://steamuserimages-a.akamaihd.net/ugc/954087817129084207/5B7E46EE484181A676C02DFCAD48ECB1C74BC423/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'
                }
                console.log(color(pushname, 'blue'))
                // console.log(pporang, nonye)

                var ceknya = nonye
                var obj = dbverify.some((val) => {
                    return val.id === ceknya
                })
                if (obj === true) {
                    return reply('Kamu sudah melakukan verifikasi') // BAKAL RESPON JIKA NO UDAH ADA
                } else {
                    // const mentah = await checkNumberStatus(nonye) // PENDAFTARAN
                    const verif = (`┌─「 *VERIFY-SUCCES* 」
│
├ *NAMA : ${pushname}*
├ *SERIAL : ${SN}*
├ *NOMOR : [@${nonye.replace(/[@s.whatsapp.net]/g, '')}]*
├ *API : wa.me/${nonye.replace('@s.whatsapp.net', '')}*
├ *WAKTU : ${moment().format('DD/MM/YY HH:mm:ss')}*
├ *BATAS PEMAKAIAN : Unlimited/Day*
│
├ Untuk melihat menu bot kirim ${prefix}menu
│ Total User yang sudah verifikasi ${dbverify.length}
│
└─「 *STAZ BOT😎* 」`)

                    const registersss = ({
                        id: nonye,
                        urlpp: pporang
                    })
                    dbverify.push(registersss)
                    fs.writeFileSync('./lib/database/user/verify.json', JSON.stringify(dbverify)) // DATABASE
                    sendMediaURL(from, pporang, verif)
                }
                break

            // Feature Other
            case 'waktu':
                reply(`Waktu Indonesia Barat: *${moment().utcOffset('+0700').format('HH:mm')}* WIB \nWaktu Indonesia Tengah: *${moment().utcOffset('+0800').format('HH:mm')}* WITA \nWaktu Indonesia Timur: *${moment().utcOffset('+0900').format('HH:mm')}* WIT`)
                break
            case 'runtime':
            case 'test':
                run = process.uptime()
                teks = `${kyun(run)}`
                fakegroup(teks)
                break
            case 'limit':
            case 'ceklimit':
                if (isOwner || isPremium) return reply('Ga usah cek limit lagi, udah auto unlimited limit😎')
                const limit = userlimit.checkLimit(sender, dbLimit)
                reply('Sisa limit penggunaan bot anda ' + limit + ' limit')
                break
            case 'speed':
            case 'ping':
                const timestamp = speed();
                const latensi = speed() - timestamp
                exec(`neofetch --stdout`, (error, stdout, stderr) => {
                    const child = stdout.toString('utf-8')
                    const teks = child.replace(/Memory:/, "Ram:")
                    const pingnya = `*${teks}Speed: ${latensi.toFixed(4)} Second*`
                    fakegroup(pingnya)
                })
                break
            case 'on':
                if (!mek.key.fromMe) return
                offline = false
                fakestatus(' ```ANDA TELAH ONLINE``` ')
                break
            case 'status':
                fakestatus(`*STATUS*\n${offline ? '> OFFLINE' : '> ONLINE'}\n${banChats ? '> SELF-MODE' : '> PUBLIC-MODE'}\n${selfbot ? '> SELFBOT ON' : '> SELFBOT OFF'}`)
                break
            case 'off':
                if (!mek.key.fromMe) return
                offline = true
                waktu = Date.now()
                anuu = q ? q : '-'
                alasan = anuu
                fakestatus(' ```ANDA TELAH OFFLINE``` ')
                break
            case 'get':
                if (!q) return reply('linknya?')
                fetch(`${args[0]}`).then(res => res.text())
                    .then(bu => {
                        fakestatus(bu)
                    })
                break
            case 'inspect':
                try {
                    if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) return reply(mess.Iv)
                    if (!q) return reply('masukan link wa')
                    cos = args[0]
                    var net = cos.split('https://chat.whatsapp.com/')[1]
                    if (!net) return reply('pastikan itu link https://whatsapp.com/')
                    jids = []
                    let { id, owner, subject, subjectOwner, desc, descId, participants, size, descOwner, descTime, creation } = await conn.query({
                        json: ["query", "invite", net],
                        expect200: true
                    })
                    let par = `*Id* : ${id}
    ${owner ? `*Owner* : @${owner.split('@')[0]}` : '*Owner* : -'}
    *Nama Gc* : ${subject}
    *Gc dibuat Tanggal* : ${formatDate(creation * 1000)}
    *Jumlah Member* : ${size}
    ${desc ? `*Desc* : ${desc}` : '*Desc* : tidak ada'}
    *Id desc* : ${descId}
    ${descOwner ? `*Desc diubah oleh* : @${descOwner.split('@')[0]}` : '*Desc diubah oleh* : -'}\n*Tanggal* : ${descTime ? `${formatDate(descTime * 1000)}` : '-'}\n\n*Kontak yang tersimpan*\n`
                    for (let y of participants) {
                        par += `> @${y.id.split('@')[0]}\n*Admin* : ${y.isAdmin ? 'Ya' : 'Tidak'}\n`
                        jids.push(`${y.id.replace(/@c.us/g, '@s.whatsapp.net')}`)
                    }
                    jids.push(`${owner ? `${owner.replace(/@c.us/g, '@s.whatsapp.net')}` : '-'}`)
                    jids.push(`${descOwner ? `${descOwner.replace(/@c.us/g, '@s.whatsapp.net')}` : '-'}`)
                    conn.sendMessage(from, par, text, { quoted: mek, contextInfo: { mentionedJid: jids } })
                } catch {
                    reply('Link error')
                }
                break
            case 'listpremium':
                let listPremi = '「 *PREMIUM USER LIST* 」\n\n'
                const deret = premium.getAllPremiumUser(dbpremium)
                const arrayPremi = []
                for (let i = 0; i < deret.length; i++) {
                    let user = pushname
                    const checkExp = ms(premium.getPremiumExpired(deret[i], dbpremium) - Date.now())
                    arrayPremi.push(await conn.getContacts(premium.getAllPremiumUser(dbpremium)))
                    listPremi += `${i + 1}. ${premium.getAllPremiumUser(dbpremium)[i].replace('@s.whatsapp.net', '')}\n➸ *Name*: @${premium.getAllPremiumUser(dbpremium)[i].replace('@s.whatsapp.net', '')}\n➸ *Expired*: ${checkExp.days} day(s) ${checkExp.hours} hour(s) ${checkExp.minutes} minute(s)\n\n`
                }
                await conn.sendMessage(from, listPremi, text, { quoted: mek, contextInfo: { "mentionedJid": premium.getAllPremiumUser(dbpremium) } })
                break
            case 'listsewa':
                let listsewa = '「 *SEWA GROUP LIST* 」\n\n'
                let nomorListsewa = 0
                const arraySewa = sewa.getAllSewa(dbsewa)
                for (let i = 0; i < arraySewa.length; i++) {
                    nomorListsewa++
                    listsewa += `${nomorListsewa}. ${arraySewa[i].subject}\n`
                    listsewa += `   - Group Id : ${arraySewa[i].id}\n`
                    listsewa += `   - Sewa left : ${ms(arraySewa[i].expired - Date.now()).days} day(s) ${ms(arraySewa[i].expired - Date.now()).hours} hour(s) ${ms(arraySewa[i].expired - Date.now()).minutes} minute(s)\n`
                    listsewa += `   - type sewa : ${arraySewa[i].type}\n\n`
                }
                reply(listsewa)
                break
            case 'premiumcheck':
            case 'cekpremium':
                if (!cekverify) return reply(`Mohon Maaf anda belum melakukan verifikasi sebagai user Staz-Bot, untuk verifikasi ketik ${prefix}verify`)
                if (!isPremium) return reply('Anda Belum terdaftar sebagai member premium atau masa aktif premium habis, untuk upgrade ke premium hubungi owner bot')
                const cekexpired = ms(premium.getPremiumExpired(senderid, dbpremium) - Date.now())
                fakegroup(`「 *PREMIUM EXPIRE* 」\n\n➸ *ID*: ${senderid}\n➸ *Premium left*: ${cekexpired.days} day(s) ${cekexpired.hours} hour(s) ${cekexpired.minutes} minute(s)`)
                break
            case 'artinama':
                if (!q) return reply('isi namanya?')
                try {
                    const artinm = await axios.get(`https://api.zeks.xyz/api/artinama?apikey=${zeksapi}&nama=${q}`)
                    const result = artinm.data.result
                    reply(`*「 ARTI NAMA 」*\n\n• Artinama :${result}`)
                } catch (err) {
                    console.log(err);
                    reply('Nama tidak ditemukan!')
                }
                break
            case 'error':
                if (!isOwner && !fromMe) return reply('Maaf fitur khusus owner kak!')
                if (args[0] === 'add') {
                    dberror.push(args[1])
                    fs.writeFileSync('./lib/database/bot/error.json', JSON.stringify(dberror))
                    reply('Done. add error ke database!')
                } else if (args[0] === 'del') {
                    if (isNaN(args[1])) return reply('Pilih nomor berapa yang mau di hapus kak!')
                    dberror.splice(args[1] - 1, 1)
                    fs.writeFileSync('./lib/database/bot/error.json', JSON.stringify(dberror))
                    reply('Done. delete error di database!')
                } else {
                    reply(`Ketik ${prefix}error add/del <angkanya>`)
                }
                break
            case 'listerror':
                let fiturError = '『 List command Error 』\n\n'
                let totalError = 0
                for (const error of dberror) {
                    totalError++
                    fiturError += `${totalError}. ${error}❌\n`
                }
                reply(fiturError)
                break

            // Feature fun
            case 'dadu':
                if (!isGroup) return reply('Perintah ini hanya bisa di gunakan dalam group!')
                const dice = Math.floor(Math.random() * 6) + 1
                await sendStickerFromUrl(from, 'https://www.random.org/dice/dice' + dice + '.png')
                break
            case 'kapankah':
                if (!isGroup) return reply('Perintah ini hanya bisa di gunakan dalam group!')
                if (args.length === 0) return reply(`Kirim perintah *${prefix}kapankah [text]*, contoh *${prefix}kapankah Staz balik*`)
                const when = body.slice(10)
                const ans = kapankah[Math.floor(Math.random() * (kapankah.length))]
                await sendText(from, `Pertanyaan: *${when}* \n\nJawaban: ${ans}`)
                break
            case 'nilai':
            case 'rate':
                if (!isGroup) return reply('Perintah ini hanya bisa di gunakan dalam group!')
                if (args.length === 0) return reply(`Kirim perintah *${prefix}rate [text]*, contoh *${prefix}rate Staz*`)
                const rating = body.slice(7)
                const awr = rate[Math.floor(Math.random() * (rate.length))]
                await sendText(from, `Pertanyaan: *${rating}* \n\nJawaban: ${awr}`)
                break
            case 'apakah':
                if (!isGroup) return reply('Perintah ini hanya bisa di gunakan dalam group!')
                if (args.length === 0) return reply(`Kirim perintah *${prefix}apakah [text]*, contoh *${prefix}apakah [text]*`)
                const nanya = body.slice(8)
                const jawab = apakah[Math.floor(Math.random() * (apakah.length))]
                await sendText(from, `Pertanyaan: *${nanya}* \n\nJawaban: ${jawab}`)
                break
            case 'bisakah':
                if (!isGroup) return reply('Perintah ini hanya bisa di gunakan dalam group!')
                if (args.length === 0) return reply(`Kirim perintah *${prefix}bisakah [text]*`)
                const bsk = body.slice(9)
                const jbsk = bisakah[Math.floor(Math.random() * (bisakah.length))]
                await sendText(from, `Pertanyaan: *${bsk}* \n\nJawaban: ${jbsk}`)
                break
            case 'rategay':
                if (!isGroup) return reply('Perintah ini hanya bisa di gunakan dalam group!')
                if (args.length === 0) return reply(`Kirim perintah *${prefix}rategay [text]*`)
                const kimakss_ = body.slice(9)
                const awrs = rategay[Math.floor(Math.random() * (rategay.length))]
                await sendText(from, `Seberapa Gay : *${kimakss_}*\nJawaban : *${awrs}*`)
                break
            case 'ratelesbi':
                if (!isGroup) return reply('Perintah ini hanya bisa di gunakan dalam group!')
                if (args.length === 0) return reply(`Kirim perintah *${prefix}ratelesbi [text]*`)
                const kimaksss_ = body.slice(11)
                const awrss = ratelesbi[Math.floor(Math.random() * (ratelesbi.length))]
                await sendText(from, `Seberapa Lesbi : *${kimaksss_}*\nJawaban : *${awrss}*`)
                break
            case 'ratetampan':
                if (!isGroup) return reply('Perintah ini hanya bisa di gunakan dalam group!')
                if (args.length === 0) return reply(`Kirim perintah *${prefix}ratetampan [text]*`)
                const pukilol = body.slice(12)
                const auah = ratetampan[Math.floor(Math.random() * (ratetampan.length))]
                await sendText(from, `Nama : *${pukilol}*\nTingkat Ketampanan : ${auah}`)
                break
            case 'ratecantik':
                if (!isGroup) return reply('Perintah ini hanya bisa di gunakan dalam group!')
                if (args.length === 0) return reply(`Kirim perintah *${prefix}ratecantik [text]*`)
                const pukilols = body.slice(12)
                const sygg = ratecantik[Math.floor(Math.random() * (ratecantik.length))]
                await sendText(from, `Nama : *${pukilols}*\nTingkat kecantikan : ${sygg}`)
                break
            case 'cekwatak':
                var namao = pushname
                try {
                    prfx = await conn.getProfilePicture(sender)
                } catch {
                    prfx = 'https://steamuserimages-a.akamaihd.net/ugc/954087817129084207/5B7E46EE484181A676C02DFCAD48ECB1C74BC423/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'
                }
                const wtk = watak[Math.floor(Math.random() * (watak.length))]
                const akhlak = ratenyaasu[Math.floor(Math.random() * (ratenyaasu.length))]
                const sft = sifat[Math.floor(Math.random() * (sifat.length))]
                const hby = hobby[Math.floor(Math.random() * (hobby.length))]
                const klbh = kelebihan[Math.floor(Math.random() * (kelebihan.length))]
                const typo = tipe[Math.floor(Math.random() * (tipe.length))]
                await reply(`[ INTROGASI SUKSES ]\n\n• *Nama* : ${namao}\n• *Watak* : ${wtk}\n• *Akhlak* : ${akhlak}\n• *Sifat* : ${sft}\n• *Hobby* : ${hby}\n• *Tipe* : ${typo}\n• *Kelebihan* : ${klbh}\n\n*Note*\n_ini hanya main main_`)
                break
            default:

                if (body.startsWith(prefix) && !prefix.includes('*') && !prefix.includes(body)) {
                    reply(`Maaf ${pushname}, Command *${prefix}${command}* Tidak Terdaftar Di Dalam *#menu*!`)
                }
                if (budy.startsWith('x') && !isOwner) {
                    try {
                        return conn.sendMessage(from, JSON.stringify(eval(budy.slice(2)), null, '\t'), text, { quoted: mek })
                    } catch (err) {
                        e = String(err)
                        reply(e)
                    }
                }

        }
        // if (isGroup && budy != undefined) {
        // 	} else {
        // 	console.log(color('[TEXT]', 'red'), 'SELF-MODE', color(sender.split('@')[0]))
        // 	}		
        // 	} catch (err) {
        //     err = String(err)
        //     if (!err.includes("this.isZero")) {
        //         console.log(color('[ERROR]', 'red'), err)
        //         }
        // 	// console.log(e)
        // 	}
        // }

    } catch (err) {
        let er = String(err)
        if (!er.includes("this.isZero")) {
            console.log(color('[ERROR]', 'red'), err)
        }
    }
}

    // } catch (err) {
    //         console.log(color('[ERROR]', 'red'), err)
    // }
    // })