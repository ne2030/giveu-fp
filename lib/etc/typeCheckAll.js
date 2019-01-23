const {
    curry, some, map, identity
} = require('fxjs2');
const typeCheck = require('./typeCheck');


// typeCheckAll
module.exports = curry((types, data) => some(identity, map(type => typeCheck(type, data), types)));
