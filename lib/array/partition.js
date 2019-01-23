const { curry } = require('fxjs2');

// partition
module.exports = curry((f, coll) => {
    const tv = [];
    const fv = [];
    const iter = coll[Symbol.iterator]();
    const push_ = v => b => (b ? tv.push(v) : fv.push(v));
    function recur() {
        let cur;
        while (!(cur = iter.next()).done) {
            const r = f(cur.value);
            if (r instanceof Promise) return r.then(push_(cur.value)).then(recur);
            push_(cur.value)(r);
        }
    }

    recur();

    return [tv, fv];
});
