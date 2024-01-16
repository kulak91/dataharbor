import { db } from '~/libs/packages/database/database.js';

import { Session as SessionModel } from './session.model.js';
import { SessionRepository } from './session.repository.js';
import { SessionService } from './session.service.js';

const sessionRepository = new SessionRepository({
  sessionModel: SessionModel,
  db,
});
const sessionService = new SessionService({ sessionRepository });

export { sessionRepository, sessionService };
export { SessionEntity } from './session.entity.js';
export { SessionModel };
