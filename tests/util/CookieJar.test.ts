import { CookieJar } from '../../src/lib/util/CookieJar';
import { Headers } from 'node-fetch';

describe('CookieJar', () => {
	describe('KV Only Headers', () => {
		const testHeadersKVO = new Headers({
			'set-cookie': 'connect.sid=hahahteststringconnectsidgobrrrrr'
		});

		test('GIVEN headers-KVO THEN should return CookieJar instance', () => {
			expect(CookieJar.create(testHeadersKVO))
				.toBeInstanceOf(CookieJar);
		});

		test('GIVEN headers-KVO THEN should return same set-cookie value', () => {
			expect(CookieJar.create(testHeadersKVO).stringify())
				.toEqual(expect.stringMatching(testHeadersKVO.get('set-cookie')!));
		});
	});

	describe('KV & K Headers', () => {
		const testHeadersKVK = new Headers({
			'set-cookie': 'connect.sid=hahahteststringconnectsidgobrrrrr;Https;Secure'
		});

		test('GIVEN headers-KVK THEN should return CookieJar instance', () => {
			expect(CookieJar.create(testHeadersKVK))
				.toBeInstanceOf(CookieJar);
		});

		test('GIVEN headers-KVK THEN should return same set-cookie value', () => {
			expect(CookieJar.create(testHeadersKVK).stringify())
				.toEqual(expect.stringMatching(testHeadersKVK.get('set-cookie')!));
		});
	});

	describe('K Only Headers', () => {
		const testHeadersKO = new Headers({
			'set-cookie': 'Https;Secure'
		});

		test('GIVEN headers-KO THEN should return CookieJar instance', () => {
			expect(CookieJar.create(testHeadersKO))
				.toBeInstanceOf(CookieJar);
		});

		test('GIVEN headers-KO THEN should return same set-cookie value', () => {
			expect(CookieJar.create(testHeadersKO).stringify())
				.toEqual(expect.stringMatching(testHeadersKO.get('set-cookie')!));
		});
	});
});
