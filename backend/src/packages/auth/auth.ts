import { logger } from '~/libs/packages/logger/logger.js';

import { AuthController } from './auth.controller.js';

const authController = new AuthController(logger);

export { authController };
export { AuthApiPath } from './libs/enums/enums.js';
