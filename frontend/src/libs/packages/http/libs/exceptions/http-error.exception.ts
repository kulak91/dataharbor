import { HttpError as LibraryHttpError } from 'shared/build/index.js';

import { type ServerErrorType } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

import { type HttpCode } from '../enums/enums.js';

type Constructor = {
  status: ValueOf<typeof HttpCode>;
  message: string;
  errorType: ValueOf<typeof ServerErrorType>;
  cause?: unknown;
};

class HttpError extends LibraryHttpError {
  public errorType: ValueOf<typeof ServerErrorType>;

  public constructor({ message, status, cause, errorType }: Constructor) {
    super({
      message,
      status,
      cause,
    });

    this.errorType = errorType;
  }
}

export { HttpError };
