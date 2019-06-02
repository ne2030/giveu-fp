const { curry, identity } = require('fxjs2');
const intersectionBy = require('./intersectionBy');

// intersection
module.exports = curry((a, b) => intersectionBy(identity, a, b));
