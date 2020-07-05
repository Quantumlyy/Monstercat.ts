import { CookieJar } from '../util/CookieJar';
import { enumerable, noop } from '../util/util';
import Chainfetch from 'chainfetch';

export interface AuthenticationInformation {
	email: string;
	password: string;
}

export const enum ApiBases {
	V2 = 'https://connect.monstercat.com/v2'
}

export class ApiHandler {

	@enumerable(false)
	private authInfo?: AuthenticationInformation;

	@enumerable(false)
	private AuthenticationCookies!: CookieJar<string>;

	public constructor(authInfo: AuthenticationInformation) {
		this.authInfo = authInfo;

		this.fetchAuth()
			.then(noop)
			.catch(console.error.bind(this));
	}

	public async fetchAuth(): Promise<CookieJar<string>> {
		if (this.AuthenticationCookies) return this.AuthenticationCookies;

		const request = await Chainfetch
			.post(`${ApiHandler.BASE_URL}/signin`)
			.send({ email: this.authInfo!.email, password: this.authInfo!.password });

		delete this.authInfo;

		this.AuthenticationCookies = CookieJar.create(request.headers);

		return this.AuthenticationCookies;
	}

	public async fetchAuthCookies(): Promise<string> {
		return (await this.fetchAuth()).stringify();
	}

	public async request(path: string): Promise<Chainfetch> {
		return Chainfetch
			.get(`${ApiHandler.BASE_URL}${path}`)
			.set('cookie', decodeURIComponent(await this.fetchAuthCookies()))
			.toJSON();
	}

	public static BASE_URL = ApiBases.V2;

}
