const {
    groupBy, entries, curry, map
} = require('fxjs2');

// groupWith
module.exports = curry(
    (f, iter) => groupBy(f, iter),
    entries,
    map(([k, v]) => ({
        key: k,
        list: v,
    }))
);
