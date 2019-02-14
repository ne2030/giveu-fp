const test = require('../testFns');

const {
    strIntersect, strJoin, strSplit, toUp, toLow
} = require('../../lib/string');

describe(
    test.fileNaming('Common', 'Fp_util - String functions'),
    () => {
        describe('strSplit', () => {
            const testString = 'ryan,henry,alice,alex';
            const testNumber = 123;
            const testObject = { a: 1 };

            it('should return splited string', () => {
                test.deepEqual(strSplit(',')(testString), ['ryan', 'henry', 'alice', 'alex']);
            });

            it('should return [string] if input is number', () => {
                test.deepEqual(strSplit(',')(testNumber), ['123']);
            });

            it('should return empty array for isFalsy string and isFalsy number', () => {
                test.deepEqual(strSplit(',')(testObject), []);
            });
        });

        describe('strIntersect', () => {
            const str1 = 'ryan,henry,alice,alex';
            const str2 = 'alice,nick,henry';
            const str3 = '1234,5678,91234';
            const testNumber = 1234;

            it('should return intersect string', () => {
                test.equal(strIntersect(str1, str2), 'henry,alice');
            });

            it('auto type conversion with number', () => {
                test.equal(strIntersect(str3, testNumber), '1234');
            });
        });

        describe('strJoin', () => {
            const strArr = ['a', 'b', 'c', 'd', 'e'];
            const expectResult = 'a,b,c,d,e';

            it('should return joined string with input Array []', () => {
                test.equal(strJoin()(strArr), expectResult);
            });

            it('should return joined string with several arguments', () => {
                test.equal(strJoin()(...strArr), expectResult);
            });

            // it('should return joined string with mixed arguments [] and str', () => {
            //     equal(strJoin()(['a', 'b', 'c'], 'd', 'e'), expectResult);
            // });

            it('should return joined string with given seperator', () => {
                test.equal(strJoin('-')(strArr), 'a-b-c-d-e');
                test.equal(strJoin('-')(...strArr), 'a-b-c-d-e');
            });
        });

        describe('toUp', () => {
            it('should return uppercase', () => {
                test.equal(toUp('abcde'), 'ABCDE');
            });
        });

        describe('toLow', () => {
            it('should return lowercase', () => {
                test.equal(toLow('ABCDE'), 'abcde');
            });
        });
    }
);
