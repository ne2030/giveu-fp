const {
    go, pipe, map, head, sortBy, curry
} = require('fxjs2');
const groupWith = require('./groupWith');

// baseOrderBy
module.exports = curry((f, arr) => go(
    arr,
    groupWith(f),
    sortBy(pipe(head, f)),
    map(x => (x.length === 1 ? head(x) : x))
));
