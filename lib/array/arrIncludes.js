const { curry } = require('fxjs2');

module.exports = curry(function arrIncludes(arr, item) {
    return arr.includes(item);
});
