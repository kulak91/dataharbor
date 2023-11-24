import {
  type AnyAction,
  type MiddlewareArray,
  type ThunkMiddleware,
  configureStore,
} from '@reduxjs/toolkit';

import { AppEnvironment } from '~/libs/enums/enums.js';
import { type Config } from '~/libs/packages/config/config.js';
import { handleError } from '~/libs/packages/store/middlewares/middlewares.js';
import { authApi } from '~/packages/auth/auth.js';
import { reducer as authReducer } from '~/slices/auth/auth.js';

import { storage } from '../storage/storage.js';

type RootReducer = {
  auth: ReturnType<typeof authReducer>;
};

type ExtraArguments = {
  storage: typeof storage;
  authApi: typeof authApi;
};

class Store {
  public instance: ReturnType<
    typeof configureStore<
      RootReducer,
      AnyAction,
      MiddlewareArray<[ThunkMiddleware<RootReducer, AnyAction, ExtraArguments>]>
    >
  >;

  public constructor(config: Config) {
    this.instance = configureStore({
      devTools: config.ENV.APP.ENVIRONMENT !== AppEnvironment.PRODUCTION,
      reducer: {
        auth: authReducer,
      },
      middleware: (getDefaultMiddleware) => {
        return [
          ...getDefaultMiddleware({
            thunk: {
              extraArgument: this.extraArguments,
            },
          }),
          handleError,
        ];
      },
    });
  }

  public get extraArguments(): ExtraArguments {
    return {
      authApi,
      storage,
    };
  }
}

export { Store };
