import { v4 as uuidv4 } from 'uuid';
import type { UUIDGenerator } from './types';

export const generateRandom: UUIDGenerator = () => {
	return uuidv4();
};