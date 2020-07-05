import { Headers } from 'node-fetch';

export class CookieJar<K, V = string> extends Map<K, V> {

	public constructor(iterable: ReadonlyArray<[K, V]>) {
		iterable = iterable
			.map(entry => [entry[0], entry[1] === undefined ? CookieJar.EMPTY_FILLER : entry[1]]) as ReadonlyArray<[K, V]>;

		super(iterable);
	}

	public stringify(): string {
		return [...this.entries()]
			.map(([k, v]) => String(v) === CookieJar.EMPTY_FILLER ? k : `${k}=${v}`).join('; ');
	}

	public static readonly EMPTY_FILLER = String.fromCharCode(167);

	public static create(headers: Headers): CookieJar<string> {
		const cookies = headers
			.raw()['set-cookie']
			.flatMap(entry => entry.split('; '))
			.map(entry => entry.split('=')) as Array<[string, string]>;

		return new CookieJar<string>(cookies);
	}

}
