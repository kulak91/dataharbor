import { HttpCode } from '~/libs/packages/http/http.js';
import { type ValueOf } from '~/libs/types/value-of.type.js';

import { HttpError } from '../http-error/http-error.exception.js';

type Constructor = {
  message: string;
  status?: ValueOf<typeof HttpCode>;
  cause?: unknown;
};

class AuthError extends HttpError {
  public constructor({
    message,
    cause,
    status = HttpCode.UNAUTHORIZED,
  }: Constructor) {
    super({ message, status, cause });
  }
}

export { AuthError };
