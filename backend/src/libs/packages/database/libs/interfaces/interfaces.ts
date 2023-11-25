import type { Sequelize } from 'sequelize';
import type { Umzug, UmzugOptions } from 'umzug';

interface IDatabase {
  connect: () => void;
}

interface IGetConfigOptions {
  templateFileName: string;
  outputPath: string;
  migrationsFolder: string;
}

interface IDatabaseUtility {
  getConfig: (opts: IGetConfigOptions) => UmzugOptions<Sequelize>;
}

interface IDatabaseUtilityFactory {
  createMigrator(): Umzug<Sequelize>;
  createSeeder(): Umzug<Sequelize>;
}

export type {
  IDatabase,
  IDatabaseUtility,
  IDatabaseUtilityFactory,
  IGetConfigOptions,
};
