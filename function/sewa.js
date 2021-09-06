const fs = require('fs-extra')
const toMs = require('ms')
const { MessageType } = require('@adiwajshing/baileys')

/**
 * Add sewa grup.
 * @param {String} groupId 
 * @param {String} expired 
 * @param {Object} _dir 
 */

const addSewaGroup = (groupId, subject, expired, _dir) => {
    const type = ['Trial 1 hari', 'Trial 7 hari', 'Langganan 1 bulan']
    let typesewa = ''
    if (expired === '1d') {
        typesewa = type[0]
    } else if (expired === '7d') {
        typesewa = type[1]
    } else if (expired === '30d' || '31d' || '32d' || '33d' || '34d' || '35d' || '36d' || '37d' && !('7d')) {
        typesewa = type[2]
    } else {
        
    }
    const obj = { id: groupId, subject, expired: Date.now() + toMs(expired), type: typesewa }
    _dir.push(obj)
    fs.writeFileSync('./lib/database/group/sewa.json', JSON.stringify(_dir))
}

/**
 * Get sewa grup position.
 * @param {String} groupId 
 * @param {Object} _dir 
 * @returns {Number}
 */
const getSewaPosition = (groupId, _dir) => {
    let position = null
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].id === groupId) {
            position = i
        }
    })
    if (position !== null) {
        return position
    }
}

/**
 * Get sewa group expired.
 * @param {String} groupId 
 * @param {Object} _dir 
 * @returns {Number}
 */
const getSewaExpired = (groupId, _dir) => {
    let position = null
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].id === groupId) {
            position = i
        }
    })
    if (position !== null) {
        return _dir[position].expired
    }
}

/**
 * Check Group Is Sewa.
 * @param {String} groupId 
 * @param {Object} _dir 
 * @returns {Boolean}
 */
const checkSewa = (groupId, _dir) => {
    let status = false
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].id === groupId) {
            status = true
        }
    })
    return status
}

/**
 * Constantly checking sewa.
 * @param {Object} _dir 
 * @param {string} groupId
 * @returns {boolean}
 */
const expiredCheck = (_dir , conn , message) => {
    setInterval(() => {
        let position = null
        Object.keys(_dir).forEach((i) => {
            if (Date.now() >= _dir[i].expired) {
                position = i
            }
        })
        if (position !== null) {
            conn.sendMessage(_dir[position].id, message, MessageType.text)
            console.log(`Sewa Expired: ${_dir[position].id}`)
            conn.groupLeave(_dir[position].id)
            _dir.splice(position, 1)
            fs.writeFileSync('./lib/database/group/sewa.json', JSON.stringify(_dir))
        }
    }, 1000)
}

/**
 * Get all sewa id.
 * @param {Object} _dir 
 * @returns {String[]}
 */
const getAllSewa = (_dir) => {
    const array = []
    Object.keys(_dir).forEach((i) => {
        array.push(_dir[i])
    })
    return array
}

/**
 * BY PIYOBOT
 * Recode By STAZ-BOT
*/

module.exports = {
    addSewaGroup,
    getSewaExpired,
    getSewaPosition,
    expiredCheck,
    checkSewa,
    getAllSewa
}
