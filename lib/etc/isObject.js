const getType = require('./getType');

// isObject
module.exports = v => getType(v, 'object');
