import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import type { Sequelize } from 'sequelize';
import { SequelizeStorage, Umzug } from 'umzug';

class Migrator {
  public sequelize: Sequelize;
  public client: Umzug<Sequelize>;

  public constructor(sequelize: Sequelize) {
    this.sequelize = sequelize;
    this.client = this.init();
  }

  public init(): Umzug<Sequelize> {
    const directory = dirname(fileURLToPath(import.meta.url));
    const migrationsPath = join(directory, '../../../db/migrations/*.ts');
    const templatePath = join(
      directory,
      'libs/templates/migration.template.ts',
    );

    return new Umzug({
      migrations: {
        glob: migrationsPath,
      },
      context: this.sequelize,
      storage: new SequelizeStorage({
        sequelize: this.sequelize,
      }),
      logger: console,
      create: {
        folder: 'src/db/migrations',
        template: (filepath): [string, string][] => {
          const templateContent = readFileSync(templatePath, {
            encoding: 'utf-8',
          });
          return [[filepath, templateContent]];
        },
      },
    });
  }
}

export { Migrator };
