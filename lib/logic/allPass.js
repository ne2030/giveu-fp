const {
    go, L, every, identity
} = require('fxjs2');
const call = require('../etc/call');

// allPass
module.exports = fns => arg => go(fns, L.map(fn => call(fn, arg)), every(identity));
