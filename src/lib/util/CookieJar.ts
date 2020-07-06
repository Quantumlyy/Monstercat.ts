import { Headers } from 'node-fetch';

/**
 * An internal class used to store the authentication cookies
 * @class
 * @internal
 * @private
 */
export class CookieJar<K, V = string> extends Map<K, V> {

	public constructor(iterable: ReadonlyArray<[K, V]>) {
		iterable = iterable
			.map(entry => [entry[0], entry[1] === undefined ? CookieJar.EMPTY_FILLER : entry[1]]) as ReadonlyArray<[K, V]>;

		super(iterable);
	}

	/**
	 * Parses all the stored cookies and transforms them back into one singular string
	 */
	public stringify(): string {
		return [...this.entries()]
			.map(([k, v]) => String(v) === CookieJar.EMPTY_FILLER ? k : `${k}=${v}`).join('; ');
	}

	/**
	 * The value that is temporarily used when a cookie is only a key without a value
	 */
	public static readonly EMPTY_FILLER = String.fromCharCode(167);

	/**
	 * Creates a fresh cookie jar directly from the request headers
	 * @param headers returned headers to be stored in a new cookie jar
	 */
	public static create(headers: Headers): CookieJar<string> {
		const cookies = headers
			.raw()['set-cookie']
			.flatMap(entry => entry.split('; '))
			.map(entry => entry.split('=')) as Array<[string, string]>;

		return new CookieJar<string>(cookies);
	}

}
