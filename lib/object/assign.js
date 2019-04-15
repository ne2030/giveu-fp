const { curry } = require('fxjs2');

// assign
module.exports = curry((first, ...objs) => Object.assign(first, ...objs));
