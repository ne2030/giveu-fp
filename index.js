const FXJS = require('fxjs2');

const Arr = require('./lib/array');
const Etc = require('./lib/etc');
const Logic = require('./lib/logic');
const Num = require('./lib/number');
const Obj = require('./lib/object');
const Str = require('./lib/string');

module.exports = {
    ...FXJS,
    ...Arr,
    ...Etc,
    ...Logic,
    ...Num,
    ...Obj,
    ...Str,
    Arr,
    Etc,
    Logic,
    Num,
    Obj,
    Str
};
