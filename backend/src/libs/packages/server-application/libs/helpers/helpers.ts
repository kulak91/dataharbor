import type { Application } from 'express';

import type { HttpMethod } from '~/libs/packages/http/libs/enums/enums.js';
import type { ValueOf } from '~/libs/types/types.js';

const formatHttpMethod = (
  method: ValueOf<typeof HttpMethod>,
): keyof Application => {
  return method.toLowerCase() as keyof Application;
};

export { formatHttpMethod };
