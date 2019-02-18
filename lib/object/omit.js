const {
    curry, omit, entries, map, head, filter, go
} = require('fxjs2');
const isFunction = require('../etc/isFunction');

// omit
module.exports = curry((predi, obj) => (isFunction(predi) ? go(
    obj,
    entries,
    filter(([, v]) => predi(v)),
    map(head), keys => omit(keys, obj)
)
    : omit(predi, obj)));
