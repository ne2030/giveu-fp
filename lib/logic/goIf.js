const { identity, pipe, stop } = require('fxjs2');

const ifElse = require('./ifElse');

// goIf
module.exports = (predi, returnFn = identity) => (...params) => ifElse(
    predi,
    identity,
    pipe(returnFn, stop),
)(...params);
