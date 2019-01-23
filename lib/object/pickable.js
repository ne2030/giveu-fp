const { curry } = require('fxjs2');
const pick = require('./pick');

// pickable
module.exports = curry((obj, keys) => pick(keys, obj));
