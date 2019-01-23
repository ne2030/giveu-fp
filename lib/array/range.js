const { pipe, take } = require('fxjs2');

// range
module.exports = pipe(
    function* range(count, start = 0) {
        const end = count + start;
        while (start < end) { yield start; start += 1; }
    },
    take(Infinity)
);
