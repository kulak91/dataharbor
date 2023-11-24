import type { ValueOf } from '../types/value-of.type';

const DataStatus = {
  IDLE: 'idle',
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
} as const;

type DataStatus = ValueOf<typeof DataStatus>;

export { DataStatus };
