const { curry } = require('fxjs2');

// has
module.exports = curry((key, obj) => key in obj);
