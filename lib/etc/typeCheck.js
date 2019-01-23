const { curry } = require('fxjs2');
const getType = require('./getType');

// typeCheck
module.exports = curry((type, data) => getType(data) === type);
