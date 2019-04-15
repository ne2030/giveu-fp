const {
    curry, omit, entries, map, head, filter, goS
} = require('fxjs2');
const isFunction = require('../etc/isFunction');
const goIf = require('../logic/goIf');

// omit
module.exports = curry((predi, obj) => goS(
    obj,
    goIf(isFunction(predi), omit(predi)),
    entries,
    filter(([, v]) => predi(v)),
    map(head),
    keys => omit(keys, obj)
));
