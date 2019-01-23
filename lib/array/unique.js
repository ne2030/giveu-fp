const { curry } = require('fxjs2');

module.exports = curry(function unique(fn, xs) {
    return xs.reduce(
        ([comparisons, originals], cur) => {
            const r = fn(cur);
            if (!comparisons.includes(r)) {
                comparisons.push(r);
                originals.push(cur);
            }
            return [comparisons, originals];
        },
        [[], []]
    )[1];
});
