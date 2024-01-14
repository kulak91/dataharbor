import { config } from '~/libs/packages/config/config.js';
import { db } from '~/libs/packages/database/database.js';
import { jwt } from '~/libs/packages/jwt/jwt.js';
import { logger } from '~/libs/packages/logger/logger.js';
import { authController } from '~/packages/auth/auth.js';
import { userController } from '~/packages/users/users.js';

import { ServerApp } from './server-app.js';
import { ServerAppApi } from './server-app-api.js';

const apiV1 = new ServerAppApi(
  'v1',
  ...authController.routes,
  ...userController.routes,
);
const app = new ServerApp({
  config,
  logger,
  db,
  apis: [apiV1],
});

export { app };
export { WHITE_ROUTES } from './libs/constants/constants.js';
export type { AppRouteParameters, WhiteRoute } from './libs/types/types.js';
