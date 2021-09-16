const fs = require('fs-extra')
const toMs = require('ms')
const { limitUser } = JSON.parse(fs.readFileSync('./setting.json'))

/**
 * @param {String} userId
 * @param {Object} _dir
 */

function isLimit(userId, _dir) {
	let found = false;
	let batasLimit = false
	Object.keys(_dir).forEach((i) => {
		if (_dir[i].id === userId) {
			let limituser = _dir[i].limit
			if (limituser >= limitUser) {
				batasLimit = true
				found = true
				return true
			} else {
				found = true
				return false
			}
		}
	})
	if (found === false) {
		const userLimit = { id: userId, limit: 1 }
		_dir.push(userLimit);
		fs.writeFileSync('./lib/database/user/limit.json', JSON.stringify(_dir))
	}
	return batasLimit
}

/**
 * @param userId
 * @param _dir
 */

function isLimitAdd(userId, _dir) {
	let found = false
	Object.keys(_dir).forEach((i) => {
		if (_dir[i].id === userId) {
			_dir[i].limit += 1
			fs.writeFileSync('./lib/database/user/limit.json', JSON.stringify(_dir))
			// found = i
		}
	})
}

/**
 * @param {String} userId
 * @param {Object} _dir
 */

function checkLimit(userId, _dir) {
	let sisaLimit = null
	Object.keys(_dir).forEach((i) => {
		if (_dir[i].id === userId) {
			sisaLimit = limitUser - _dir[i].limit
		}
	})
	return sisaLimit
}

module.exports = { isLimit, isLimitAdd, checkLimit }