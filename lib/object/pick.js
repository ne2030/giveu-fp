const { curry } = require('fxjs2');
const isArray = require('../etc/isArray');

// pick
module.exports = curry((keys, obj) => (isArray(keys)
    ? keys.reduce(
        (acc, key) => (key in obj ? (acc[key] = obj[key], acc) : acc),
        {}
    )
    : keys in obj ? { [keys]: obj[keys] } : {}));
