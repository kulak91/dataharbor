import { type IEntity } from '~/libs/interfaces/interfaces.js';

class UserEntity implements IEntity {
  private 'id': number | null;

  private 'email': string;

  private 'passwordHash': string | null;

  private 'passwordSalt': string | null;

  private 'firstName': string;

  private 'lastName': string;

  private 'createdAt': Date;

  private 'updatedAt': Date;

  private constructor({
    id,
    email,
    passwordHash,
    passwordSalt,
    lastName,
    firstName,
    createdAt,
    updatedAt,
  }: {
    id: number | null;
    email: string;
    passwordHash: string | null;
    passwordSalt: string | null;
    lastName: string;
    firstName: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = id;
    this.email = email;
    this.passwordHash = passwordHash;
    this.passwordSalt = passwordSalt;
    this.firstName = firstName;
    this.lastName = lastName;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public static initialize({
    id,
    email,
    passwordHash,
    passwordSalt,
    firstName,
    lastName,
    createdAt,
    updatedAt,
  }: {
    id: number;
    email: string;
    passwordHash: string | null;
    passwordSalt: string | null;
    lastName: string;
    firstName: string;
    createdAt: Date;
    updatedAt: Date;
  }): UserEntity {
    return new UserEntity({
      id,
      email,
      passwordHash,
      passwordSalt,
      lastName,
      firstName,
      createdAt,
      updatedAt,
    });
  }

  public static initializeNew({
    email,
    passwordHash,
    passwordSalt,
    lastName,
    firstName,
  }: {
    email: string;
    passwordHash: string;
    passwordSalt: string;
    lastName: string;
    firstName: string;
  }): UserEntity {
    return new UserEntity({
      id: null,
      email,
      passwordHash,
      passwordSalt,
      firstName,
      lastName,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  public toObject(): {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      id: this.id!,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  public toUpdateObject(): {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      id: this.id!,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  public toNewObject(): {
    email: string;
    passwordHash: string;
    passwordSalt: string;
    firstName: string;
    lastName: string;
  } {
    return {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      ...this.privateData,
    };
  }

  public get privateData(): {
    passwordHash: string;
    passwordSalt: string;
  } {
    return {
      passwordHash: this.passwordHash!,
      passwordSalt: this.passwordSalt!,
    };
  }
}

export { UserEntity };
