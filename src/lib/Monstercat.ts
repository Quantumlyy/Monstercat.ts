import { enumerable } from './util/util';
import { ApiHandler } from './structures/ApiHandler';

import { SelfPlaylists } from './structures/data/SelfPlaylists';
import { PlaylistPid } from './structures/data/PlaylistPid';

export class Monstercat {

	@enumerable(false)
	public readonly api!: ApiHandler;

	public constructor(email: string, password: string) {
		this.api = new ApiHandler({ email, password });
	}

	public async getSelfPlaylists(): Promise<SelfPlaylists> {
		return SelfPlaylists.create((await this.api.request('/self/playlists')).body);
	}

	public async getPlaylistPid(pid: string): Promise<PlaylistPid> {
		return PlaylistPid.create((await this.api.request(`/playlist/${pid}`)).body);
	}

	public async getPlaylistPidCatalog(pid: string): Promise<unknown> {
		return (await this.api.request(`/playlist/${pid}/catalog`)).body;
	}

}
