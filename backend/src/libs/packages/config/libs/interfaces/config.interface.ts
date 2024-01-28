import { type ConfigSchema as ILibraryConfig } from 'shared/build/index.js';

import { type EnvironmentSchema } from '../types/types.js';

interface ConfigSchema extends ILibraryConfig<EnvironmentSchema> {}

export { type ConfigSchema };
