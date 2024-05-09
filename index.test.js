const { describe, test, expect } = require('@jest/globals');
const getMostActiveCookie = require('./index');
// test data
const data = require('./test-data.js');

// Jest tests
describe('Get Active Cookie', () => {
	test('Single value', () => {
		expect(getMostActiveCookie(data.single, '2018-12-09'))
			.toStrictEqual(['AtY0laUfhglK3lC7']);
	});
	test('Multiple values', () => {
		expect(getMostActiveCookie(data.multiple, '2018-12-09'))
			.toStrictEqual(['AtY0laUfhglK3lC7', '5UAVanZf6UtGyKVS']);
	});
});