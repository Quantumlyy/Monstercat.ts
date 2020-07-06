import { enumerable } from '../../util/util';

export interface MonstercatPaginationOptions {
	page: number;
	limit: number;
	skip: number;
}

export class DataRawBase<T> {

	@enumerable(false)
	protected readonly data: T;

	public constructor(data: T) {
		this.data = data;
	}

	public get rawDta(): T {
		return this.data;
	}

}
