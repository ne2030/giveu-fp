const { match, constant } = require('fxjs2');

const isFunction = require('./isFunction');
const isStrictEqual = require('./isStrictEqual');
const isString = require('./isString');
const isNumber = require('./isNumber');
const isBool = require('./isBool');
const isArray = require('./isArray');
const isError = require('./isError');

// getType
module.exports = data => match(data)
    .case(isStrictEqual(null))(constant('null'))
    .case(Number.isNaN)(constant('NaN'))
    .case(isFunction)(constant('function'))
    .case(isStrictEqual(undefined))(constant('undefined'))
    .case(isString)(constant('string'))
    .case(isNumber)(constant('number'))
    .case(isBool)(constant('boolean'))
    .case(isArray)(constant('array'))
    .case(isError)(constant('error'))
    .case(d => typeof d === 'object')(constant('object'))
    .else(constant('unknown'));
