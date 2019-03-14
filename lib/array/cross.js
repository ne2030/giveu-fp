const { toIter } = require('fxjs2');

const flat = function* (...iters) {
    for (const iter of iters) {
        yield* iter;
    }
};


// cross
module.exports = (xs, ys, predi, f) => {
    let iter = toIter(ys);
    const results = [];

    for (const x of xs) {
        let cur;
        let found = false;
        const filtered = [];
        while (!found && (cur = iter.next(), !cur.done)) {
            found = predi(x, cur.value);
            if (!found) filtered.push(cur.value);
        }

        if (found) {
            iter = flat(filtered, iter);
            results.push(f(x, cur.value));
        } else {
            iter = toIter(filtered);
            results.push(x);
        }
    }

    return results;
};
