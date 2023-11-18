import type { Request, Response } from 'express';

import type { HttpMethod } from '~/libs/packages/http/http.js';

type AppRouteParameters = {
  path: string;
  method: HttpMethod;
  handler: (req: Request, res: Response) => Promise<void> | void;
};

export { type AppRouteParameters };
