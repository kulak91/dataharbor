import { type ServerErrorType } from '~/libs/enums/enums.js';

type ServerCommonErrorResponse = {
  errorType: typeof ServerErrorType.COMMON;
  message: string;
};

type ServerAuthErrorResponse = {
  errorType: typeof ServerErrorType.AUTHORIZATION;
  message: string;
};

type ServerErrorResponse = ServerCommonErrorResponse | ServerAuthErrorResponse;

export {
  type ServerAuthErrorResponse,
  type ServerCommonErrorResponse,
  type ServerErrorResponse,
};
