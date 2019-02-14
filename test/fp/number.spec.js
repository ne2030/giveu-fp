const {
    pipeS, constant, identity
} = require('fxjs2');
const test = require('../testFns');

const {
    random, isPositive, roundTo
} = require('../../lib/number');

const {
    alwaysFalse: aF, alwaysTrue: aT, aMid, aFin
} = require('../testValues');

describe(
    test.fileNaming('Common', 'Fp_util - Number functions'),
    () => {
        describe('random', () => {
            it('should return randomize number', () => {
                const numbers = Array(20).fill(0).map(_ => random(100));
                numbers.forEach((n) => {
                    test.ok(n >= 0);
                    test.ok(n <= 100);
                });
            });

            it('should return randomize number with min', () => {
                const numbers = Array(20).fill(50).map(min => random(min, 100));
                numbers.forEach((n) => {
                    test.ok(n >= 50);
                    test.ok(n <= 100);
                });
            });
        });

        describe('isPositive', () => {
            it('should be true when positive', () => {
                test.ok(isPositive(3));
            });

            it('should be true when positive', () => {
                test.notOk(isPositive(-5));
            });
        });

        describe('roundTo', () => {
            it('should return rounded number', () => {
                test.equal(roundTo(1.005, 2), 1.01);
            });

            it('should return rounded number with default decimal', () => {
                test.equal(roundTo(1.005), 1);
            });
        });
    }
);
