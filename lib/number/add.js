const { curry } = require('fxjs2');

// add
module.exports = curry((a, b) => +a + +b);
