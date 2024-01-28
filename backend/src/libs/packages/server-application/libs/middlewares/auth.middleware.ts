import { type NextFunction, type Request, type Response } from 'express';

import { ExceptionMessage } from '~/libs/enums/enums.js';
import { AuthError } from '~/libs/exceptions/exceptions.js';
import { type JWTService } from '~/libs/packages/jwt/jwt.js';
import { type LoggerService } from '~/libs/packages/logger/logger.js';
import { type UserService } from '~/packages/users/users.js';

import { isWhiteRoute } from '../helpers/helpers.js';

type AuthMiddlewareOpts = {
  logger: LoggerService;
  jwt: JWTService;
  userService: UserService;
};

const authMiddleware =
  ({ jwt, userService }: AuthMiddlewareOpts) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { headers, path, method } = req;
    if (isWhiteRoute({ path, method })) {
      return next();
    }

    const [, token] = headers.authorization?.split(' ') ?? [];

    if (!token) {
      return next(
        new AuthError({ message: ExceptionMessage.UNAUTHORIZED_USER }),
      );
    }

    try {
      const { userId } = await jwt.verify<{ userId: number }>(token);

      const authorizedUser = await userService.findById(userId);

      if (!authorizedUser) {
        throw new AuthError({
          message: ExceptionMessage.INVALID_TOKEN,
        });
      }

      req.user = authorizedUser;
    } catch (e) {
      if (e instanceof AuthError) {
        return next(
          new AuthError({
            message: e.message ?? ExceptionMessage.UNAUTHORIZED_USER,
          }),
        );
      }
      return next(
        new AuthError({
          message: ExceptionMessage.UNAUTHORIZED_USER,
        }),
      );
    }

    next();
  };

export { authMiddleware };
