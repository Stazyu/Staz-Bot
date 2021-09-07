const fs = require('fs-extra')

let db_notifbc = JSON.parse(fs.readFileSync('./lib/database/user/notif_broadcast.json'))

/**
 * 
 * @param {stringi} userId 
 */
const addNotifBroadcast = (userId) => {
    db_notifbc.push({id: userId})
    fs.writeFileSync('./lib/database/user/notif_broadcast.json', JSON.stringify(db_notifbc))
}

/**
 * 
 * @param {string} userId 
 * @returns 
 */
const checkIdBroadcast = (userId) => {
    let status = true
    Object.keys(db_notifbc).forEach((i) => {
        if (db_notifbc[i].id === userId) {
            status = false
        }
    })
    return status
}

/**
 * Get premium user position.
 * @param {String} userId 
 * @returns {Number}
 */
const getBroadcastPosition = (userId) => {
    let position = null
    Object.keys(db_notifbc).forEach((i) => {
        if (db_notifbc[i].id === userId) {
            position = i
        }
    })
    if (position !== null) {
        return position
    }
}

module.exports = { addNotifBroadcast, checkIdBroadcast, getBroadcastPosition }



