const usedCommandRecently = new Set()

/**
 * Check is number filtered
 * @param  {String} userId
 */
const isFiltered = (userId) => !!usedCommandRecently.has(userId)

/**
 * Add number to filter
 * @param  {String} userId
 */
const addFilter = (userId) => {
    usedCommandRecently.add(userId)
    setTimeout(() => usedCommandRecently.delete(userId), 5000) // 5sec is delay before processing next command
}

module.exports = {
    isFiltered,
    addFilter
}