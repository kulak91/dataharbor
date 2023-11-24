import { type AnyAction, type Middleware, isRejected } from '@reduxjs/toolkit';

import { type AppDispatch } from '~/libs/packages/store/libs/types/types.js';

const handleError: Middleware<unknown, unknown, AppDispatch> = () => {
  return (next) => {
    return (action: AnyAction) => {
      if (isRejected(action)) {
        alert(action.error.message ?? 'Something went wrong');
      }

      return next(action);
    };
  };
};

export { handleError };
