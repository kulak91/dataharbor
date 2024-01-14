import {
  type JWTPayload,
  type JWTVerifyResult,
  jwtVerify,
  SignJWT,
} from 'jose';

import { type ConfigSchema } from '~/libs/packages/config/config.js';
import { type LoggerService } from '~/libs/packages/logger/logger.js';

import { type JWTService } from './libs/interfaces/interfaces.js';
import { type SignJWTConfig, type SignJWTOptions } from './libs/types/types.js';

type Constructor = {
  config: ConfigSchema;
  logger: LoggerService;
};

class JWT implements JWTService {
  private config: ConfigSchema;
  private logger: LoggerService;
  private secret: Uint8Array;

  public constructor({ config, logger }: Constructor) {
    this.config = config;
    this.logger = logger;
    this.secret = new TextEncoder().encode(this.config.ENV.JWT.SECRET_KEY);
  }

  public async sign({ exp, claim }: SignJWTOptions): Promise<string> {
    return new SignJWT(claim)
      .setProtectedHeader({ alg: this.signConfig.alg })
      .setIssuedAt()
      .setIssuer(this.signConfig.issuer)
      .setExpirationTime(exp ?? this.signConfig.exp)
      .sign(this.secret);
  }

  public async verify<T extends JWTPayload>(
    token: string,
  ): Promise<JWTVerifyResult<T>['payload']> {
    const { payload } = await jwtVerify<T>(token, this.secret);

    return payload;
  }

  private get signConfig(): SignJWTConfig {
    return {
      alg: 'HS256',
      issuer:
        this.config.ENV.APP.PUBLIC_URL ??
        `http://${this.config.ENV.APP.HOST}:${this.config.ENV.APP.PORT}`,
      exp: '2h',
    };
  }
}

export { JWT };
