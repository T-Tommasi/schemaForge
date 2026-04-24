import { v5 as uuidv5 } from 'uuid';
import type { UUIDStrategy } from '../types';
import type { UUIDGenerator } from './types';

const NAMESPACE = '9f142e9e-5a1e-4e8c-8a3b-7c6d5e4f3a2b';

function buildUniqueId(row: Record<string, unknown>, fields?: string[]): string {
	if (fields?.length) {
		return fields.map((f) => `${f}=${row[f] ?? ''}`).join('|');
	}
	const keys = Object.keys(row).sort();
	return keys.map((k) => `${k}=${row[k]}`).join('|');
}

export function makeHashGenerator(strategy: UUIDStrategy): UUIDGenerator {
	const fields = strategy.fields;

	return (row: Record<string, unknown>): string => {
		const uniqueId = buildUniqueId(row, fields);
		return uuidv5(uniqueId, NAMESPACE);
	};
}