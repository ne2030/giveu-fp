const { curry } = require('fxjs2');
const val = require('./val');

// dic
module.exports = curry((obj, key) => val(key, obj));
