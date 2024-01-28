import { type AnyAction, type Middleware, isRejected } from '@reduxjs/toolkit';

import { ExceptionMessage } from '~/libs/enums/enums.js';
import { notification } from '~/libs/packages/notification/notification.js';
import { type AppDispatch } from '~/libs/packages/store/libs/types/types.js';
import { actions as authActions } from '~/slices/auth/auth.js';

const handleError: Middleware<unknown, unknown, AppDispatch> = ({
  dispatch,
}) => {
  return (next) => {
    return (action: AnyAction) => {
      if (isRejected(action)) {
        console.log('In redux', action.error.message);
        if (action.error.message === ExceptionMessage.JWT_EXPIRED) {
          dispatch(authActions.refreshToken());
          return next(action);
        }
        notification.error(action.error.message ?? ExceptionMessage.GENERIC);
      }

      return next(action);
    };
  };
};

export { handleError };
