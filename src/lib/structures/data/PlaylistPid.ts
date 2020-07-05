import { SelfPlaylistsResult, ISelfPlaylistsResult } from './SelfPlaylists';

export interface IPlaylistPid extends ISelfPlaylistsResult { }

export class PlaylistPid extends SelfPlaylistsResult implements IPlaylistPid {

	protected constructor(data: IPlaylistPid) {
		super(data);
	}

	public static create(data: IPlaylistPid): PlaylistPid {
		return new PlaylistPid(data);
	}

}
