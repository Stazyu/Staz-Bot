const fs = require('fs-extra')
const dbAdminBot = JSON.parse(fs.readFileSync('./lib/database/bot/admin.json'))


function addBotAdmin(sender) {
	const obj = { id: sender, date: Date.now() }
	dbAdminBot.push(obj)
	fs.writeFileSync('./lib/database/bot/admin.json', JSON.stringify(dbAdminBot))
}

function delBotAdmin(sender) {
	let position = null
	Object.keys(dbAdminBot).forEach((i) => {
		if (dbAdminBot[i].id === sender) {
			position = i
		}
	})
	if (position !== null) {
		dbAdminBot[position].splice(position, 1)
	}
}

function getAllBotAdmins() {
	let arrayAdmins = []
	Object.keys(dbAdminBot).forEach((i) => {
		arrayAdmins.push(dbAdminBot[i])
	})
	return arrayAdmins
}

module.exports = { addBotAdmin, delBotAdmin, getAllBotAdmins }