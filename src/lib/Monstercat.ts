import { enumerable } from './util/util';
import { ApiHandler } from './structures/ApiHandler';
import { SelfPlaylists } from './structures/data/SelfPlaylists';

export class Monstercat {

	@enumerable(false)
	public readonly api!: ApiHandler;

	public constructor(email: string, password: string) {
		this.api = new ApiHandler({ email, password });
	}

	public async fetchSelfPlaylists(): Promise<SelfPlaylists> {
		return SelfPlaylists.create((await this.api.request('/self/playlists')).body);
	}

}
