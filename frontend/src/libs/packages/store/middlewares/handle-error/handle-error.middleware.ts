import { type AnyAction, type Middleware, isRejected } from '@reduxjs/toolkit';

import { ExceptionMessage } from '~/libs/enums/enums.js';
import { notification } from '~/libs/packages/notification/notification.js';
import { type AppDispatch } from '~/libs/packages/store/libs/types/types.js';

const handleError: Middleware<unknown, unknown, AppDispatch> = () => {
  return (next) => {
    return (action: AnyAction) => {
      if (isRejected(action)) {
        notification.error(action.error.message ?? ExceptionMessage.GENERIC);
      }

      return next(action);
    };
  };
};

export { handleError };
