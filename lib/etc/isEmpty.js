const { match, isIterable, constant } = require('fxjs2');
const isObject = require('./isObject');
const isNil = require('./isNil');

// isEmpty
module.exports = match.case(isIterable)(v => v[Symbol.iterator]().next().done)
    .case(isObject)(v => Object.keys(v).length === 0)
    .case(isNil)(constant(true))
    .else(constant(false));
