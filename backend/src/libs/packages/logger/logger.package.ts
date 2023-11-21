import { type Logger as TLogger, pino } from 'pino';

import { type ILogger } from './libs/interfaces/interfaces.js';

class Logger implements ILogger {
  private logger: TLogger;

  public constructor() {
    this.logger = pino({
      transport: {
        target: 'pino-pretty',
      },
    });
  }

  public debug(
    message: string,
    parameters: Record<string, unknown> = {},
  ): ReturnType<ILogger['debug']> {
    this.logger.debug(parameters, message);
  }

  public error(
    message: string,
    parameters: Record<string, unknown> = {},
  ): ReturnType<ILogger['error']> {
    this.logger.error(parameters, message);
  }

  public info(
    message: string,
    parameters: Record<string, unknown> = {},
  ): ReturnType<ILogger['info']> {
    this.logger.info(parameters, message);
  }

  public warn(
    message: string,
    parameters: Record<string, unknown> = {},
  ): ReturnType<ILogger['warn']> {
    this.logger.warn(parameters, message);
  }
}

export { Logger };
