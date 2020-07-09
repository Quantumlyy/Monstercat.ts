import { parse as parseUrl } from 'url';

/**
 * @enumerable decorator that sets the enumerable property of a class field to false.
 * @param value true if and only if this property shows up during enumeration of the properties on the corresponding object.
 * @private
 */
export function enumerable(value: boolean) {
	return (target: unknown, key: string) => {
		Object.defineProperty(target, key, {
			enumerable: value,
			set(this: unknown, val: unknown) {
				Object.defineProperty(this, key, {
					configurable: true,
					enumerable: value,
					value: val,
					writable: true
				});
			}
		});
	};
}

/**
 * An empty function used for when we dont need returned/calledback values
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-empty-function
export function noop() { }

export function parsePlaylistUrl(url: string): string {
	const parsedUrl = parseUrl(url, false);
	return parsedUrl.path!.split('/')[1];
}
