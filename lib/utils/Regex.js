
const regexPatternMatch = async (pattern) => new RegExp(`.*${pattern}.*`, 'i');

module.exports = regexPatternMatch;