export interface ToNumberOptions {
	radix?: number;
	nanValue?: number;
}

export const toNumber = (value: string, options?: ToNumberOptions): number => {
	const radix = options?.radix ?? 10;
	const result = parseInt(value.trim(), radix);
	return options?.nanValue !== undefined && isNaN(result) ? options.nanValue : result;
};