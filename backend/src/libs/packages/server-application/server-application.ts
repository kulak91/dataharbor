import { config } from '~/libs/packages/config/config.js';
import { db } from '~/libs/packages/database/database.js';
import { logger } from '~/libs/packages/logger/logger.js';
import { authController } from '~/packages/auth/auth.js';

import { ServerApp } from './server-app.js';
import { ServerAppApi } from './server-app-api.js';

const apiV1 = new ServerAppApi(
  'v1',
  config,
  ...authController.routes,
);
const app = new ServerApp({
  config,
  logger,
  db,
  apis: [apiV1],
});

export { app };
