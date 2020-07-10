import { expectCalledStrict, expectReturnedStrict} from '../mocks/testutils';
import * as utils from '../../src/lib/util/util';

describe('Util', () => {

	describe('noop', () => {
		test('GIVEN function THEN matches function type', () => {
			expect(utils.noop).toEqual(expect.any(Function));
		});

		test('GIVEN call THEN should return undefined', () => {
			jest.spyOn(utils, 'noop');

			utils.noop();

			expectCalledStrict(utils.noop, 1);
			expectReturnedStrict(utils.noop, 1, undefined);
		});
	});

	describe('parsePlaylistUrl', () => {
		const playlistId = 'b44076a4-532e-43dd-926a-690c3cec8059';
		const playlistUrlWithHttpsContext = 'https://www.monstercat.com/playlist/b44076a4-532e-43dd-926a-690c3cec8059';
		const playlistUrlWithoutContext = 'www.monstercat.com/playlist/b44076a4-532e-43dd-926a-690c3cec8059';

		test('GIVEN url WITH https context THEN returns proper playlist id', () => {
			expect(utils.parsePlaylistUrl(playlistUrlWithHttpsContext))
				.toEqual(expect.stringMatching(playlistId));
		});

		test('GIVEN url WITHOUT context THEN returns proper playlist id', () => {
			expect(utils.parsePlaylistUrl(playlistUrlWithoutContext))
				.toEqual(expect.stringMatching(playlistId));
		});
	});

});
