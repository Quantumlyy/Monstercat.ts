import { parse as parseUrl } from 'url';

/**
 * An empty function used for when we dont need returned/calledback values
 * @private
 */
// eslint-disable-next-line @typescript-eslint/no-empty-function
export function noop() { }

export function parsePlaylistUrl(url: string): string {
	const parsedUrl = parseUrl(url, false);
	return parsedUrl.path!.split('/')[2];
}
