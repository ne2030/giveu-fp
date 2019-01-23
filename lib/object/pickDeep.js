const { curry, reduce } = require('fxjs2');
const partition = require('../array/partition');
const isString = require('../etc/isString');
const isEmpty = require('../etc/isEmpty');
const merge = require('./merge');
const pick = require('./pick');
const set = require('./set');


// pickDeep
module.exports = curry(function f(pattern, obj) {
    const [keys, deepPattern] = partition(isString, pattern);
    return isEmpty(deepPattern)
        ? pick(keys, obj)
        : merge(
            pick(keys, obj),
            reduce((deepObj, { n, p }) => set(n, f(p, obj[n]), deepObj), {}, deepPattern)
        );
});
