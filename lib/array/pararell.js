// pararell
module.exports = (xs, ys, f) => {
    const [iterX, iterY] = [xs[Symbol.iterator](), ys[Symbol.iterator]()];
    const nxs = [];

    let x, y;
    while ((x = iterX.next(), y = iterY.next(), !x.done && !y.done)) {
        nxs.push(f(x.value, y.value));
    }

    return nxs;
};
