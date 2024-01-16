import type { DatabaseService } from '~/libs/packages/database/database.js';

import { SessionEntity } from './session.entity.js';
import type { Session as SessionModel } from './session.model.js';

type Constructor = {
  sessionModel: typeof SessionModel;
  db: DatabaseService;
};

class SessionRepository {
  private sessionModel: typeof SessionModel;

  private db: DatabaseService;

  public constructor({ sessionModel, db }: Constructor) {
    this.sessionModel = sessionModel;
    this.db = db;
  }

  public async findByUserToken(
    userId: number,
    token: string,
  ): Promise<SessionEntity | null> {
    const session = await this.sessionModel.findOne({
      where: { userId, token },
    });

    if (!session) {
      return null;
    }

    return SessionEntity.initialize({
      id: session.id,
      createdAt: session.createdAt,
      updatedAt: session.updatedAt,
      ip: session.ip,
      token: session.token,
      userId: session.userId,
    });
  }

  public async create(payload: SessionEntity): Promise<SessionEntity> {
    const { ip, token, userId } = payload.toNewObject();

    const session = await this.sessionModel.create({ token, userId, ip });

    return SessionEntity.initialize(session);
  }

  public async delete(userId: number, token: string): Promise<number> {
    return this.sessionModel.destroy({ where: { userId, token } });
  }
}

export { SessionRepository };
