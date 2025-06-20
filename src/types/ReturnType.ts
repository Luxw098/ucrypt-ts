export type ReturnType<T> =
	| {
			status: true;
			data: T;
	  }
	| {
			status: false;
			data: Error;
	  };

export function Return<T>(status: true, data: T): ReturnType<T>;
export function Return<T>(status: false, error: Error): ReturnType<T>;
export function Return<T>(status: boolean, result: unknown): ReturnType<T> {
	return {
		status,
		data: result
	} as ReturnType<T>;
}
