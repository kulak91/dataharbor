import type {
  SessionCreateRequestDTO,
  SessionCreateResponseDTO,
} from './types/types.js';
import { SessionEntity } from './session.entity.js';
import type { SessionRepository } from './session.repository.js';

type Constructor = {
  sessionRepository: SessionRepository;
};

class SessionService {
  private sessionRepository: SessionRepository;

  public constructor({ sessionRepository }: Constructor) {
    this.sessionRepository = sessionRepository;
  }

  public async findByUserToken(
    userId: number,
    token: string,
  ): Promise<SessionCreateResponseDTO | null> {
    const session = await this.sessionRepository.findByUserToken(userId, token);

    if (!session) {
      return null;
    }

    return session.toObject();
  }

  public async create(
    payload: SessionCreateRequestDTO,
  ): Promise<SessionCreateResponseDTO> {
    const session = await this.sessionRepository.create(
      SessionEntity.initializeNew(payload),
    );

    return session.toObject();
  }

  public async deleteByUserToken(
    userId: number,
    token: string,
  ): Promise<number> {
    return this.sessionRepository.delete(userId, token);
  }
}

export { SessionService };
