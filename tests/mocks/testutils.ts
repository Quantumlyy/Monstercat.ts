/**
 * Copyright 2019-2020 Antonio Román
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export function expectCalledStrict(
	mockFn: ReturnType<typeof jest.fn> | ReturnType<typeof jest.spyOn>,
	amountOfCalls = 1,
	...calledWithArgs: unknown[]
) {
	expect(mockFn).toHaveBeenCalledTimes(amountOfCalls);
	if (amountOfCalls > 0) {
		expect(mockFn).toHaveBeenCalledWith(...calledWithArgs);
	}
}


export function expectReturnedStrict(
	mockFn: ReturnType<typeof jest.fn> | ReturnType<typeof jest.spyOn>,
	amountOfReturns = 1,
	...returnedWithArgs: unknown[]
) {
	expect(mockFn).toHaveReturnedTimes(amountOfReturns);
	if (amountOfReturns > 0) {
		// @ts-expect-error Returned with args should always be provided when amount of returns is higher than 0
		expect(mockFn).toHaveReturnedWith(...returnedWithArgs);
	}
}
