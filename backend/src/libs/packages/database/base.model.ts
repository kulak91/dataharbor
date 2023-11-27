import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from '@sequelize/core';
import { Model } from '@sequelize/core';

class BaseModel<
  T extends Model<Record<string, unknown>, Record<string, unknown>>,
> extends Model<InferAttributes<T>, InferCreationAttributes<T>> {
  public readonly id!: CreationOptional<number>;
  public readonly createdAt!: CreationOptional<Date>;
  public readonly updatedAt!: CreationOptional<Date>;
}

export { BaseModel };
