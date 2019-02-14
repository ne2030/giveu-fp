// roundTo
module.exports = (n, decimal = 0) => +(`${Math.round(`${n}e+${decimal}`)}e-${decimal}`);
