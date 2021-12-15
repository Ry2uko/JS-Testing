const assert = require('chai').assert; 
const app = require('../app');

const testFoo = app.testFoo;

describe('App', () => {
    describe('Data Types', () => {
        it('should return undefined if no parameter is passed', () => {
            const result = testFoo();
            assert.isUndefined(result, 'Undefined');
        });
        it('should return the correct data type', () => {
            const result = testFoo(24);
            assert.typeOf(result, 'number');
        });
        it('should return the passed data', () => {
            const result = testFoo('Yahalloo');
            assert.equal(result, 'Yahalloo');
        });
    });
});