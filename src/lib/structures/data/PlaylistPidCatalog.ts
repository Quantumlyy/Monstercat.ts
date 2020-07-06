import { MonstercatPaginationOptions } from './Common';

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
