import { type NextFunction, type Request, type Response } from 'express';
import { ValidationError } from 'express-validation';
import type { ServerCommonErrorResponse } from 'shared/build/index.js';
import { HttpError, ServerErrorType } from 'shared/build/index.js';

import { HttpCode } from '~/libs/packages/http/http.js';
import type { LoggerService } from '~/libs/packages/logger/logger.js';

const errorHandlerMiddleware =
  (logger: LoggerService) =>
  (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ): Response<unknown, Record<string, unknown>> => {
    if (err instanceof ValidationError) {
      return res.status(err.statusCode).json(err);
    }
    if (err instanceof HttpError) {
      logger.error(`[Http Error]: ${err.status.toString()} – ${err.message}`);

      const response: ServerCommonErrorResponse = {
        errorType: ServerErrorType.COMMON,
        message: err.message,
      };

      return res.status(err.status).send(response);
    }

    logger.error('Unknown error', { err });

    return res.status(HttpCode.INTERNAL_SERVER_ERROR).json(err);
  };

export { errorHandlerMiddleware };
