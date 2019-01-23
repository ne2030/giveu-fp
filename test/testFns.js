const {
    map, L: { indexValues }
} = require('fxjs2');

const should = require('should');
const chalk = require('chalk');

const testFns = {};

testFns.equal = (real, expected) => {
    should.equal(real, expected);
    return testFns;
};

testFns.deepEqual = (real, expected) => {
    should.deepEqual(real, expected);
    return testFns;
};

testFns.notEqual = (a, b) => {
    should.notEqual(a, b);
    return testFns;
};

testFns.below = (real, expected) => {
    should(real).below(expected);
    return testFns;
};

testFns.notDeepEqual = (a, b) => {
    should(a).not.deepEqual(b);
    return testFns;
};

testFns.hasLength = (n, data) => {
    should(data).have.length(n);
    return testFns;
};

testFns.shouldNotHave = (data, keys) => {
    should(data).have.properties(keys);
};

testFns.isError = (error) => {
    should(error).be.Error();
    return testFns;
};

testFns.above = (real, n) => {
    should(real).above(n);
    return testFns;
};

testFns.ok = (bool) => {
    should(bool).ok();
    return testFns;
};

testFns.notOk = (bool) => {
    should(bool).not.ok();
    return testFns;
};

testFns.throw = (fn) => {
    should(fn).throw();
    return testFns;
};

testFns.shouldRejected = (promise) => {
    promise.should.be.rejected();
    return testFns;
};

testFns.isFalsy = (a) => {
    should(a).be.false();
    return testFns;
};

testFns.isFunction = (a) => {
    should(a).be.a.Function();
    return testFns;
};

const logColor = [chalk.red, chalk.blue, chalk.green, chalk.yello, chalk.magenta];

testFns.fileNaming = (...strs) => map(([idx, s]) => logColor[idx % 5](s), indexValues(strs)).join(' - ');

module.exports = testFns;
