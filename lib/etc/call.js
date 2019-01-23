const { curry } = require('fxjs2');

// call
module.exports = curry((fn, p) => fn(p));
