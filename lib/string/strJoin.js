const isArray = require('../etc/isArray');

// strJoin
module.exports = seperator => (arr, ...str) => (isArray(arr) ? arr.join(seperator) : [arr, ...str].join(seperator));
