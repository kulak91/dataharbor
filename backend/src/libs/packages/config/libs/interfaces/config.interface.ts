import { type ConfigSchema as ILibraryConfig } from 'shared/build/index.js';

import { type AuthConfig, type EnvironmentSchema } from '../types/types.js';

interface ConfigSchema extends ILibraryConfig<EnvironmentSchema> {
  AUTH: AuthConfig;
}

export { type ConfigSchema };
