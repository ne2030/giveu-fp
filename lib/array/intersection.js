const { filter, some } = require('fxjs2');

// intersection
module.exports = (collA, collB) => filter(a => some((b => b === a), collB), collA);
