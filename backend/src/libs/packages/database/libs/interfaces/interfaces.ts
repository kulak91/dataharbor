import type { Sequelize } from '@sequelize/core';
import type { Umzug, UmzugOptions } from 'umzug';

interface DatabaseService {
  init: () => Promise<void>;
  client: Sequelize;
}

interface MigrationConfigOptions {
  templateFileName: string;
  outputPath: string;
  migrationsFolder: string;
}

interface DatabaseConfigurator {
  getConfig: (opts: MigrationConfigOptions) => UmzugOptions<Sequelize>;
}

interface DatabaseConfiguratorFactory {
  createMigrator(): Umzug<Sequelize>;
  createSeeder(): Umzug<Sequelize>;
}

export type {
  DatabaseConfigurator,
  DatabaseConfiguratorFactory,
  DatabaseService,
  MigrationConfigOptions,
};
