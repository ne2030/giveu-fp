const box = require('./box');

const { isArray } = Array;

module.exports = function toArr(v) {
    return isArray(v) ? v : box(v);
};
