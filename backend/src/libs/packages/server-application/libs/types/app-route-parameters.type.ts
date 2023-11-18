import type { Request, Response } from 'express';
import type { schema } from 'express-validation';

import type { HttpMethod } from '~/libs/packages/http/http.js';

type AppRouteParameters = {
  path: string;
  method: HttpMethod;
  handler: (req: Request, res: Response) => Promise<void> | void;
  validation?: schema;
};

export { type AppRouteParameters };
