const {
    go, L, some, identity
} = require('fxjs2');
const call = require('../etc/call');

// anyPass
module.exports = fns => arg => go(fns, L.filter(fn => call(fn, arg)), some(identity));
