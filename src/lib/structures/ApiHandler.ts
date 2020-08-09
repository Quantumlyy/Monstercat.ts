import { CookieJar } from '../util/CookieJar';
import { noop } from '../util/util';
import fetch, { Headers, Response } from 'node-fetch';
import { stringify } from '@favware/querystring';

export interface AuthenticationInformation {
	email: string;
	password: string;
}

export const enum ApiBases {
	V2 = 'https://connect.monstercat.com/v2'
}

export class ApiHandler {

	protected authenticated = false;

	private AuthenticationCookies!: CookieJar<string>;

	public constructor(authInfo?: AuthenticationInformation) {
		if (authInfo) {
			this.fetchAuth(authInfo)
				.then(noop)
				.catch(console.error.bind(this));
		}
	}

	public async fetchAuth(authInfo?: AuthenticationInformation): Promise<CookieJar<string>> {
		if (!this.authenticated && !authInfo) throw new Error('In order to authenticate please pass the appropriate info');
		if (this.authenticated) return this.AuthenticationCookies;

		const headers = new Headers();
		headers.set('User-Agent', ApiHandler.UserAgent);
		headers.set('Content-Type', 'application/json');

		const request = await fetch(`${ApiHandler.BASE_URL}/signin`, {
			method: 'post',
			body: JSON.stringify({ email: authInfo!.email, password: authInfo!.password }),
			headers
		});

		/* const request = await Chainfetch
			.post(`${ApiHandler.BASE_URL}/signin`)
			.set('User-Agent', ApiHandler.UserAgent)
			.send({ email: authInfo!.email, password: authInfo!.password }); */

		this.AuthenticationCookies = CookieJar.create(request.headers);
		this.authenticated = true;

		return this.AuthenticationCookies;
	}

	public async request<T>(path: string, pqso?: T, authed = true): Promise<Response> {
		const headers = new Headers([['User-Agent', ApiHandler.UserAgent]]);
		if (!this.authenticated && authed) throw new Error('In order to authenticate please call the fetchAuth method first');
		if (this.authenticated && authed) headers.set('cookie', decodeURIComponent((await this.fetchAuth()).stringify()));


		/* return Chainfetch
			.get(`${ApiHandler.BASE_URL}${path}${pqso ? stringify<T>(pqso) : ''}`)
			.set(headers)
			.toJSON(); */
		return fetch(`${ApiHandler.BASE_URL}${path}${pqso ? stringify<T>(pqso) : ''}`, {
			headers
		});
	}

	public static BASE_URL = ApiBases.V2;

	public static UserAgent = `Monstercat.ts (https://github.com/QuantumlyTangled/Monstercat.ts)`;

}
