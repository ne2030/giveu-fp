const {
    constant, identity
} = require('fxjs2');
const test = require('../testFns');

const {
    ifElse, multiFn, allPass, anyPass, or
} = require('../../lib/logic');

const {
    alwaysFalse: aF, alwaysTrue: aT, aMid, aFin
} = require('../testValues');

describe(
    test.fileNaming('Common', 'Fp_util - Logic functions'),
    () => {
        describe('ifElse', () => {
            const ifFn = constant('if');
            const elseFn = constant('else');
            const result = ifElse(identity, ifFn, elseFn);

            it('should return function after conditions', () => {
                test.isFunction(result);
            });

            it('if predicate is true, call if function', () => {
                test.equal('if', result(true));
            });

            it('if predicate is false, call else function', () => {
                test.equal('else', result(false));
            });
        });

        describe('multiFn', () => {
            const fns = [identity, aMid, aFin];
            const args = [1, 2];
            it('shoud multiple function with arguments', () => {
                test.deepEqual([1, 'Mid', 'Fin'], multiFn(...fns)(...args));
            });
        });

        describe('allPass', () => {
            it('true when all functions true', () => {
                test.ok(allPass([aT, aT, aT, aT, aT])());
            });

            it('false when some false', () => {
                test.isFalsy(allPass([aT, aT, aT, aT, aF])());
            });
        });

        describe('anyPass', () => {
            it('true when any true', () => {
                test.ok(anyPass([aT, aT, aT])());
                test.ok(anyPass([aT, aT, aF])());
            });

            it('false when all false', () => {
                test.isFalsy(anyPass([aF, aF, aF])());
            });
        });

        describe('or', () => {
            it('should return first argument when first is truthy', () => {
                test.equal(1, or(1, 2));
            });

            it('should return second argument when first is falsy', () => {
                test.equal(2, or(false, 2));
            });

            it('should return first argument when "or" is curried and second argument is falsy', () => {
                test.equal(2, or(2)(false));
            });
        });
    }
);
