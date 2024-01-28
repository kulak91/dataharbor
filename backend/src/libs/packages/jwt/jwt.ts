import { config } from '~/libs/packages/config/config.js';
import { logger } from '~/libs/packages/logger/logger.js';

import { JWT } from './jwt.package.js';

const jwt = new JWT({ config, logger });

export { jwt };
export { type JWTService } from './libs/interfaces/interfaces.js';
