export type ReturnType<T> =
	| {
			status: true;
			data: T;
	  }
	| {
			status: false;
			data: Error;
	  };

export const ReturnTrue = (data: any) => {
	return {
		status: true,
		data: data
	} as ReturnType<any>;
};

export const ReturnFalse = (error: Error) => {
	return {
		status: false,
		data: error
	} as ReturnType<any>;
};
