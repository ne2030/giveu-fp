const { curry } = require('fxjs2');

// val
module.exports = curry((key, obj) => obj[key]);
