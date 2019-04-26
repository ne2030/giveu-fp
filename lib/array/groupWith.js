const {
    groupBy, values, go, curry
} = require('fxjs2');

// groupWith
module.exports = curry((f, iter) => go(
    iter,
    groupBy(f),
    values,
));
