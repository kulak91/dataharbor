import type { Request, Response } from 'express';

type AppRouteParameters = {
  path: string;
  method: string;
  handler: (req: Request, res: Response) => Promise<void> | void;
};

export { type AppRouteParameters };
