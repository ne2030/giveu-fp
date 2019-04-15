const {
    pipeS, constant, identity
} = require('fxjs2');
const test = require('../testFns');

const {
    ifElse, stopIf, goIf, multiFn, allPass, anyPass, or, iff, xor
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

        describe('stopIf', () => {
            const basic = pipeS(
                stopIf(identity),
                aFin
            );

            const withReturn = pipeS(
                stopIf(identity, aMid),
                aFin
            );

            it('should stop pipe if predicate is truthy', () => {
                test.equal(10, basic(10));
            });

            it('should call returnFn when predicate is truthy', () => {
                test.equal('Mid', withReturn(true));
            });

            it('should continue pipe if predicate is falsy', () => {
                test.equal('Fin', basic(false));
            });
        });

        describe('goIf', () => {
            const basic = pipeS(
                goIf(identity),
                aFin
            );

            const withReturn = pipeS(
                goIf(identity, aMid),
                aFin
            );

            it('should go pipe if predicate is truthy', () => {
                test.equal('Fin', basic(true));
            });

            it('should call returnFn when predicate is falsy', () => {
                test.equal('Mid', withReturn(false));
            });

            it('should stop pipe if predicate is falsy', () => {
                test.equal(false, basic(false));
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

        describe('xor', () => {
            it('should return true when xor', () => {
                test.ok(xor(1, 0));
                test.ok(xor(0, 1));
                test.ok(xor(true, false));
                test.ok(xor(false, true));
                test.ok(xor('', true));
                test.ok(xor(true, ''));
                test.ok(xor(undefined, 'abc'));
                test.ok(xor('abc', undefined));
            });

            it('should return false when xor', () => {
                test.notOk(xor(1, 1));
                test.notOk(xor(0, 0));
                test.notOk(xor(true, true));
                test.notOk(xor(false, false));
                test.notOk(xor('', false));
                test.notOk(xor(false, ''));
                test.notOk(xor(true, 'abc'));
                test.notOk(xor(null, undefined));
            });
        });

        describe('iff', () => {
            it('should call f when predicate true', () => {
                const init = 10;
                const result = iff(n => n === 10, n => n + 10)(init);
                test.equal(result, 20);
            });

            it('should not call f when predicate false', () => {
                const init = 10;
                const result = iff(n => n === 11, n => n + 10)(init);
                test.equal(result, 10);
            });
        });
    }
);
