export type ReturnType<T> =
	| {
			status: true;
			data: T;
	  }
	| {
			status: false;
			data: Error;
	  };

export function ReturnTrue<T>(data: unknown) {
	return {
		status: true,
		data: data
	} as ReturnType<T>;
}

export function ReturnFalse<T>(error: Error) {
	return {
		status: false,
		data: error
	} as ReturnType<T>;
}
