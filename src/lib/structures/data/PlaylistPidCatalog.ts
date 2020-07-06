/* eslint-disable @typescript-eslint/member-ordering */
import { MonstercatPaginationOptions, DataRawBase } from './Common';

export interface IPlaylistPidCatalog {
	results: IPlaylistPidCatalogResult[];
	notFound: any[];
	total: number;
	limit: number;
	skip: number;
}

export interface IPlaylistPidCatalogResult {
	artistsTitle: string;
	bpm: number;
	creatorFriendly: boolean;
	debutDate: Date;
	downloadable: boolean;
	duration: number;
	explicit: boolean;
	genrePrimary: string;
	genreSecondary: string;
	id: string;
	inEarlyAccess: boolean;
	isrc: string;
	streamable: boolean;
	title: string;
	trackNumber: number;
	tags: string[];
	version: string;
	release: IPlaylistPidCatalogRelease;
	artists: IPlaylistPidCatalogArtist[];
	playlistSort: number;
}

export interface IPlaylistPidCatalogArtist {
	id: string;
	uri: string;
	name: string;
	public: boolean;
	role: string;
}

export interface IPlaylistPidCatalogRelease {
	artistsTitle: string;
	catalogId: string;
	id: string;
	tags: null;
	title: string;
	type: string;
	releaseDate: Date;
	upc: string;
}

export interface PlaylistPidCatalogOptions extends MonstercatPaginationOptions { }

export class PlaylistPidCatalogArtist extends DataRawBase<IPlaylistPidCatalogArtist> implements IPlaylistPidCatalogArtist {

	public readonly id: string;
	public readonly uri: string;
	public readonly name: string;
	public readonly public: boolean;
	public readonly role: string;

	protected constructor(data: IPlaylistPidCatalogArtist) {
		super(data);

		this.id = String(this.data.id);
		this.uri = String(this.data.uri);
		this.name = String(this.data.name);
		this.public = Boolean(this.data.public);
		this.role = String(this.data.role);
	}

	public static create(data: IPlaylistPidCatalogArtist): PlaylistPidCatalogArtist {
		return new PlaylistPidCatalogArtist(data);
	}

}

export class PlaylistPidCatalogRelease extends DataRawBase<IPlaylistPidCatalogRelease> implements IPlaylistPidCatalogRelease {

	public readonly artistsTitle: string;
	public readonly catalogId: string;
	public readonly id: string;
	public readonly tags: null;
	public readonly title: string;
	public readonly type: string;
	public readonly releaseDate: Date;
	public readonly upc: string;

	protected constructor(data: IPlaylistPidCatalogRelease) {
		super(data);

		this.artistsTitle = String(this.data.artistsTitle);
		this.catalogId = String(this.data.catalogId);
		this.id = String(this.data.id);
		this.tags = this.data.tags;
		this.title = String(this.data.title);
		this.type = String(this.data.type);
		this.releaseDate = new Date(this.data.releaseDate);
		this.upc = String(this.data.upc);
	}

	public static create(data: IPlaylistPidCatalogRelease): PlaylistPidCatalogRelease {
		return new PlaylistPidCatalogRelease(data);
	}

}
