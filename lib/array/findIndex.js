const {
    go, L: { indexValues }, find, head, curry
} = require('fxjs2');

// findIndex
module.exports = curry((f, coll) => go(coll, indexValues, find(([, a]) => f(a)), head));
