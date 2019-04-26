const { curry, reduce, last } = require('fxjs2');

// splitEvery
module.exports = curry((n, xs) => reduce(
    (nxs, cur) => (last(nxs).length < n ? (last(nxs).push(cur), nxs) : (nxs.push([cur]), nxs)),
    [[]],
    xs
));
