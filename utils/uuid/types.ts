import type { UUIDStrategy } from '../types';

export type UUIDGenerator = (row: Record<string, unknown>, index: number) => string;

export interface UUIDStrategyConfig {
	strategy: UUIDStrategy;
	generate: UUIDGenerator;
}

export interface UUIDNamespace {
	name: string;
	code: string;
}
