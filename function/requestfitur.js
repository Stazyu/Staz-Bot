const fs = require('fs-extra')
const dbRequest = JSON.parse(fs.readFileSync('./lib/database/bot/request.json'))

/**
 * Add request
 * @param {String} from 
 * @param {String} teks 
 */

function addrequest(from, teks) {
	const date = Date.now()
	const obj = { from: from, req: teks, date: date }
	dbRequest.push(obj)
	fs.writeFileSync('./lib/database/bot/request.json', JSON.stringify(dbRequest))
}

/**
 * Delete request
 * @param {String} teks 
 */

function delRequest(teks) {
	Object.keys(dbRequest).forEach((i) => {
		if (teks === dbRequest[i].req) {
			dbRequest.splice(i, 1)
			fs.writeFileSync('./lib/database/bot/request.json', JSON.stringify(dbRequest))
		}
	})
}

/**
 * List request
 */

function listRequest() {
	let request = []
	Object.keys(dbRequest).forEach((i) => {
		request.push(dbRequest[i])
	})
	return request
}

module.exports = { addrequest, delRequest, listRequest }