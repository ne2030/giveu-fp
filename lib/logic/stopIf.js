const { identity, pipe, stop } = require('fxjs2');

const ifElse = require('./ifElse');

// stopIf
module.exports = (predi, returnFn = identity) => arg => ifElse(
    predi,
    pipe(returnFn, stop),
    identity
)(arg);
