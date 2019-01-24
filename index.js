const array = require('./lib/array');
const etc = require('./lib/etc');
const logic = require('./lib/logic');
const number = require('./lib/number');
const object = require('./lib/object');
const string = require('./lib/string');

module.exports = {
    ...array,
    ...etc,
    ...logic,
    ...number,
    ...object,
    ...string
};
