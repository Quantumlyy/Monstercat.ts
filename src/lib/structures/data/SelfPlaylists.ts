/* eslint-disable @typescript-eslint/member-ordering */
import { enumerable } from '../../util/util';

export interface ISelfPlaylists {
	results: ISelfPlaylistsResult[];
	archived: number;
	count: number;
	labelId: string;
	limit: number;
	offset: number;
	search: string;
	total: number;
	sort: ISelfPlaylistsFields;
	beginDate: Date;
	endDate: Date;
	visibility: number;
	fields: ISelfPlaylistsFields;
}

export interface ISelfPlaylistsFields {
}

export interface ISelfPlaylistsResult {
	deleted: boolean;
	createdAt: Date;
	updatedAt: Date;
	id: string;
	public: boolean;
	myLibrary: boolean;
	numRecords: number;
	name: string;
	userId: string;
	tracks: null;
}

export class SelfPlaylistsResult implements ISelfPlaylistsResult {

	@enumerable(false)
	protected readonly data: ISelfPlaylistsResult;

	public readonly deleted!: boolean;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
	public readonly id!: string;
	public readonly public!: boolean;
	public readonly myLibrary!: boolean;
	public readonly numRecords!: number;
	public readonly name!: string;
	public readonly userId!: string;
	public readonly tracks!: null;

	protected constructor(data: ISelfPlaylistsResult) {
		this.data = data;

		this.deleted = Boolean(this.data.deleted);
		this.createdAt = new Date(this.data.createdAt);
		this.updatedAt = new Date(this.data.updatedAt);
		this.id = String(this.data.id);
		this.public = Boolean(this.data.public);
		this.myLibrary = Boolean(this.data.myLibrary);
		this.numRecords = Number(this.data.numRecords);
		this.name = String(this.data.name);
		this.userId = String(this.data.userId);
		this.tracks = this.data.tracks;
	}

	public static create(data: ISelfPlaylistsResult): SelfPlaylistsResult {
		return new SelfPlaylistsResult(data);
	}

}

export class SelfPlaylists implements ISelfPlaylists {

	@enumerable(false)
	protected readonly data: ISelfPlaylists;

	public readonly results!: SelfPlaylistsResult[];
	public readonly archived!: number;
	public readonly count!: number;
	public readonly labelId!: string;
	public readonly limit!: number;
	public readonly offset!: number;
	public readonly search!: string;
	public readonly total!: number;
	public readonly sort!: ISelfPlaylistsFields;
	public readonly beginDate!: Date;
	public readonly endDate!: Date;
	public readonly visibility!: number;
	public readonly fields!: ISelfPlaylistsFields;

	protected constructor(data: ISelfPlaylists) {
		this.data = data;

		this.results = this.data.results.map(result => SelfPlaylistsResult.create(result));
		this.archived = Number(this.data.archived);
		this.count = Number(this.data.count);
		this.labelId = String(this.data.labelId);
		this.limit = Number(this.data.limit);
		this.offset = Number(this.data.offset);
		this.search = String(this.data.search);
		this.total = Number(this.data.total);
		this.sort = this.data.sort;
		this.beginDate = new Date(this.data.beginDate);
		this.endDate = new Date(this.data.endDate);
		this.visibility = Number(this.data.visibility);
		this.fields = this.data.fields;
	}

	public static create(data: ISelfPlaylists): SelfPlaylists {
		return new SelfPlaylists(data);
	}

}
