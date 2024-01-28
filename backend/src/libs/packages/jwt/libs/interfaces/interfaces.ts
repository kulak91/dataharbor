import type { JWTPayload, JWTVerifyResult } from 'jose';

import { type SignJWTOptions } from '../types/types.js';

interface JWTService {
  sign: (opts: SignJWTOptions) => Promise<string | null>;
  verify<T extends JWTPayload>(
    token: string,
  ): Promise<JWTVerifyResult<T>['payload']>;
  decode<T extends JWTPayload>(token: string): JWTVerifyResult<T>['payload'];
}

export { type JWTService };
