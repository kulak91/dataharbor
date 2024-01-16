import { type IEntity } from '~/libs/interfaces/interfaces.js';

class SessionEntity implements IEntity {
  private 'id': number | null;

  private 'userId': number;

  private 'ip': string | undefined;

  private 'token': string;

  private 'createdAt': Date;

  private 'updatedAt': Date;

  private constructor({
    id,
    userId,
    ip,
    token,
    createdAt,
    updatedAt,
  }: {
    id: number | null;
    userId: number;
    ip: string | undefined;
    token: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = id;
    this.ip = ip;
    this.token = token;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public static initialize({
    id,
    userId,
    ip,
    token,
    createdAt,
    updatedAt,
  }: {
    id: number;
    userId: number;
    ip: string | undefined;
    token: string;
    createdAt: Date;
    updatedAt: Date;
  }): SessionEntity {
    return new SessionEntity({
      id,
      userId,
      ip,
      token,
      createdAt,
      updatedAt,
    });
  }

  public static initializeNew({
    userId,
    ip,
    token,
  }: {
    userId: number;
    ip: string | undefined;
    token: string;
  }): SessionEntity {
    return new SessionEntity({
      id: null,
      userId,
      ip,
      token,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  public toObject(): {
    id: number;
    userId: number;
    ip: string | undefined;
    token: string;
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      id: this.id!,
      userId: this.userId,
      ip: this.ip,
      token: this.token,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  public toUpdateObject(): {
    id: number;
    userId: number;
    ip: string | undefined;
    token: string;
    createdAt: Date;
    updatedAt: Date;
  } {
    return {
      id: this.id!,
      userId: this.userId,
      ip: this.ip,
      token: this.token,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  public toNewObject(): {
    userId: number;
    ip: string | undefined;
    token: string;
  } {
    return {
      userId: this.userId,
      ip: this.ip,
      token: this.token,
    };
  }
}

export { SessionEntity };
