import { v4 as uuidv4 } from 'uuid';
import type { UUIDGenerator } from './types';

export const generateV4: UUIDGenerator = () => {
	return uuidv4();
};