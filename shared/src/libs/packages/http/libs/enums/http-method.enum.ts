import type { ValueOf } from '~/libs/types/value-of.type';

const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;

type HttpMethod = ValueOf<typeof HttpMethod>;

export { HttpMethod };
