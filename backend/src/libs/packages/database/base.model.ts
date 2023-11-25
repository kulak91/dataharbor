import type { ModelAttributes, ModelOptions, Sequelize } from 'sequelize';
import { DataTypes } from 'sequelize';

import { db } from './database.js';

class BaseModel {
  private db: Sequelize;
  public dataTypes: typeof DataTypes;

  public constructor() {
    this.db = db.client;
    this.dataTypes = DataTypes;
  }

  public defineModel(
    modelName: string,
    attributes: ModelAttributes,
    opts?: ModelOptions,
  ): void {
    this.db.define(modelName, attributes, opts);
  }
}

export { BaseModel };
