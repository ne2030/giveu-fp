const { curry } = require('fxjs2');
const getType = require('./getType');

// log
module.exports = curry((prefix, target) => {
    console.log(`${prefix} - ${target}, type - ${getType(target)}`);
    return target;
});
