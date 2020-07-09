import { enumerable } from './util/util';
import { ApiHandler } from './structures/ApiHandler';

import { SelfPlaylists, SelfPlaylistsOptions } from './structures/data/SelfPlaylists';
import { PlaylistPid } from './structures/data/PlaylistPid';
import { PlaylistPidCatalogOptions, PlaylistPidCatalog } from './structures/data/PlaylistPidCatalog';

export class Monstercat {

	@enumerable(false)
	public readonly api!: ApiHandler;

	/**
	 * @param email The Email of the authenticating user
	 * @param password The Password of the authenticating user
	 * @constructor
	 */
	public constructor(email: string, password: string) {
		this.api = new ApiHandler({ email, password });
	}

	public async getSelfPlaylists(options?: SelfPlaylistsOptions): Promise<SelfPlaylists> {
		return SelfPlaylists.create((await this.api.request('/self/playlists', options)).body);
	}

	public async getPlaylistPid(pid: string): Promise<PlaylistPid> {
		return PlaylistPid.create((await this.api.request(`/playlist/${pid}`)).body);
	}

	public async getPlaylistPidCatalog(pid: string, options?: PlaylistPidCatalogOptions): Promise<PlaylistPidCatalog> {
		return PlaylistPidCatalog.create((await this.api.request(`/playlist/${pid}/catalog`, options)).body);
	}

}
