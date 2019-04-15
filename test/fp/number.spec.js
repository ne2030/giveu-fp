const test = require('../testFns');

const {
    random, isPositive, roundTo, gt, gte, lt, lte, isUnit
} = require('../../lib/number');

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

        describe('math compare', () => {
            it('20 is greater than 10', () => {
                test.ok(gt(20, 10));
            });
            it('20 is greater than or equal 10', () => {
                test.ok(gte(20, 10));
            });
            it('10 greater than or equal 10', () => {
                test.ok(gte(10, 10));
            });
            it('10 is less than 20', () => {
                test.ok(lt(10, 20));
            });
            it('10 is less than or equal 20', () => {
                test.ok(lte(10, 20));
            });
            it('10 greater than or equal 10', () => {
                test.ok(lte(10, 10));
            });
        });

        describe('isUnit', () => {
            it('should predicate true', () => {
                test.ok(isUnit(100, 500));
                test.ok(isUnit(1000, 5000));
            });

            it('should predicate false', () => {
                test.notOk(isUnit(100, 501));
                test.notOk(isUnit(2, 5001));
            });
        });
    }
);
