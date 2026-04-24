export interface ToBooleanOptions {
	trueValues?: string[];
	falseValues?: string[];
}

const DEFAULT_TRUE = ['true', '1', 'yes', 'on'];
const DEFAULT_FALSE = ['false', '0', 'no', 'off'];

export const toBoolean = (value: string, options?: ToBooleanOptions): boolean | null => {
	if (!value.trim()) return null;

	const lower = value.toLowerCase().trim();
	const trueVals = options?.trueValues ?? DEFAULT_TRUE;
	const falseVals = options?.falseValues ?? DEFAULT_FALSE;

	if (trueVals.includes(lower)) return true;
	if (falseVals.includes(lower)) return false;

	return null;
};