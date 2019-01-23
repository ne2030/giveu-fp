const { find } = require('fxjs2');
const isPromise = require('./isPromise');

// hasPromise
module.exports = xs => !!find(isPromise, xs);
