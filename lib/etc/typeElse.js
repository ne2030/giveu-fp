const { go, not } = require('fxjs2');
const typeCheckAll = require('./typeCheckAll');
const isArray = require('./isArray');

// typeElse
module.exports = (data, types) => go(
    data,
    typeCheckAll(isArray(types) ? types : [types]),
    not
);
