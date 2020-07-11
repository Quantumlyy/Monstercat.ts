import { CookieJar } from '../../src/lib/util/CookieJar';
import { Headers } from 'node-fetch';

describe('CookieJar', () => {
	const testHeaders = new Headers({
		'set-cookie': 'connect.sid=hahahteststringconnectsidgobrrrrr'
	});

	test('GIVEN headers THEN should return CookieJar instance', () => {
		expect(CookieJar.create(testHeaders))
			.toBeInstanceOf(CookieJar);
	});

	test('GIVEN headers THEN should return same set-cookie value', () => {
		expect(CookieJar.create(testHeaders).stringify())
			.toEqual(expect.stringMatching(testHeaders.get('set-cookie')!));
	});
});
