import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import type { Sequelize } from 'sequelize';
import type { UmzugOptions } from 'umzug';
import { SequelizeStorage } from 'umzug';

import type { LoggerService } from '~/libs/packages/logger/logger.js';

import type {
  DatabaseConfigurator,
  MigrationConfigOptions,
} from './libs/interfaces/interfaces.js';

class DatabaseUtilityBase implements DatabaseConfigurator {
  private sequelize: Sequelize;
  private directory: string;
  private logger: LoggerService;

  public constructor(sequelize: Sequelize, logger: LoggerService) {
    this.sequelize = sequelize;
    this.logger = logger;
    this.directory = dirname(fileURLToPath(import.meta.url));
  }

  public getConfig({
    migrationsFolder,
    outputPath,
    templateFileName,
  }: MigrationConfigOptions): UmzugOptions<Sequelize> {
    const _templatePath = join(
      this.directory,
      'libs/templates',
      templateFileName,
    );
    const _migrationsPath = join(
      this.directory,
      '../../../db/',
      migrationsFolder,
      '/*.{js,ts}',
    );

    return {
      migrations: {
        glob: _migrationsPath,
        resolve: ({ name, path, context: sequelize }) => ({
          name,
          up: async (): Promise<unknown> => {
            if (!path) {
              this.logger.error('Could not resolve migrations path.');
              return;
            }
            const module = await import(path);
            return module.up({ path, name, context: sequelize });
          },
          down: async (): Promise<unknown> => {
            if (!path) {
              this.logger.error('Could not resolve migrations path.');
              return;
            }
            const module = await import(path);
            return module.down({ path, name, context: sequelize });
          },
        }),
      },
      context: this.sequelize,
      storage: new SequelizeStorage({ sequelize: this.sequelize }),
      logger: console,
      create: {
        folder: outputPath,
        template: (filepath) => [
          [filepath, readFileSync(_templatePath, { encoding: 'utf-8' })],
        ],
      },
    };
  }
}

export { DatabaseUtilityBase };
