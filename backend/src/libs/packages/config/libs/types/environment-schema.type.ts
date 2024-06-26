import { type AppEnvironment } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';

type EnvironmentSchema = {
  APP: {
    PORT: number;
    HOST: string;
    ENVIRONMENT: ValueOf<typeof AppEnvironment>;
    PUBLIC_URL: string | null;
  };
  DB: {
    CONNECTION_STRING: string;
    DIALECT: string;
    POOL_MIN: number;
    POOL_MAX: number;
  };
  JWT: {
    SECRET_KEY: string;
  };
  CLIENT: {
    development: string;
    production: string;
  };
};

export { type EnvironmentSchema };
