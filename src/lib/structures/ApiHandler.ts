import { CookieJar } from '../util/CookieJar';
import { enumerable, noop } from '../util/util';
import Chainfetch from 'chainfetch';
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

	@enumerable(false)
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

		const request = await Chainfetch
			.post(`${ApiHandler.BASE_URL}/signin`)
			.set('User-Agent', ApiHandler.UserAgent)
			.send({ email: authInfo!.email, password: authInfo!.password });

		this.AuthenticationCookies = CookieJar.create(request.headers);
		this.authenticated = true;

		return this.AuthenticationCookies;
	}

	public async request<T>(path: string, pqso?: T, authed = true): Promise<Chainfetch> {
		const headers: string[][] = [['User-Agent', ApiHandler.UserAgent]];
		if (!this.authenticated && authed) throw new Error('In order to authenticate please call the fetchAuth method first');
		if (this.authenticated && authed) headers.push(['cookie', decodeURIComponent((await this.fetchAuth()).stringify())]);

		return Chainfetch
			.get(`${ApiHandler.BASE_URL}${path}${pqso ? stringify<T>(pqso) : ''}`)
			.set(headers)
			.toJSON();
	}

	public static BASE_URL = ApiBases.V2;

	public static UserAgent = `Monstercat.ts (https://github.com/QuantumlyTangled/Monstercat.ts)`;

}
