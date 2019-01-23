const { produce } = require('immer');

const { curry } = require('fxjs2');

module.exports = curry((xs, item) => produce(xs, (arr) => { arr.push(item); }));
