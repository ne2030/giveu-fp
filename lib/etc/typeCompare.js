const { curry } = require('fxjs2');
const getType = require('./getType');

// typeCompare
module.exports = curry((mock, real) => getType(mock) === getType(real));
