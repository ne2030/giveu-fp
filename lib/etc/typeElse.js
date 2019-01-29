const { go, not, curry } = require('fxjs2');
const typeCheckAll = require('./typeCheckAll');
const isArray = require('./isArray');

// typeElse
module.exports = curry((types, data) => go(
    data,
    typeCheckAll(isArray(types) ? types : [types]),
    not
));
