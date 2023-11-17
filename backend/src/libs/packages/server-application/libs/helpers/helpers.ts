import type { Application } from 'express';

import type { HttpMethod } from '~/libs/packages/http/libs/enums/enums.js';

const formatHttpMethod = (method: HttpMethod): keyof Application => {
  return method.toLowerCase() as keyof Application;
};

export { formatHttpMethod };
