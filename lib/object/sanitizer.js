const {
    map, match, reduce, keys
} = require('fxjs2');

const isStrictEqual = require('./isStrictEqual');
const isEqual = require('./isEqual');
const getType = require('./getType');
const set = require('../object/set');
const isNil = require('../etc/isNil');

const escapeFalse = Symbol('false');
const escapeTrue = Symbol('true');

const sanitizer = format => (data, context = data) => {
    const failThrow = (result, real, k) => {
        if (result === false) throw k;
        return match(result)
            .case(isStrictEqual(true))(() => real)
            .case(isEqual(sanitizer.esF))(() => false)
            .case(isEqual(sanitizer.esT))(() => true)
            .else(() => result);
    };

    const test = function f(mock, real, key) {
        const expectedType = getType(mock);
        const realType = getType(real);

        // custome checker or sanitizer
        if (expectedType === 'function') return failThrow(mock(real, context), real, key);

        // type check
        if (expectedType !== realType) throw key;

        // deep check - object, array
        if (expectedType === 'object') {
            return reduce((acc, k) => set(k, f(mock[k], real[k], k))(acc), real, keys(mock));
        }

        if (expectedType === 'array') {
            return mock.length == 0 ? real
                : map(realEl => f(mock[0], realEl, key), real);
        }

        return real;
    };
    return test(format, data);
};

sanitizer.err = (err) => { throw err; };

sanitizer.esF = escapeFalse;
sanitizer.esT = escapeTrue;
sanitizer.exists = data => !isNil(data) && data;

module.exports = sanitizer;
