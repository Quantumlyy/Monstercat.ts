export interface MonstercatPaginationBase {
	page: number;
	limit: number;
	skip: number;
}

/**
 * @class
 * @hideconstructor
 */
export class DataRawBase<T> {

	protected readonly data: T;

	public constructor(data: T) {
		this.data = data;
	}

	public get rawDta(): T {
		return this.data;
	}

}
