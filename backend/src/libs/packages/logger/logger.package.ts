import { type Logger as TLogger, pino } from 'pino';

import { type LoggerService } from './libs/interfaces/interfaces.js';

class Logger implements LoggerService {
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
  ): ReturnType<LoggerService['debug']> {
    this.logger.debug(parameters, message);
  }

  public error(
    message: string,
    parameters: Record<string, unknown> = {},
  ): ReturnType<LoggerService['error']> {
    this.logger.error(parameters, message);
  }

  public info(
    message: string,
    parameters: Record<string, unknown> = {},
  ): ReturnType<LoggerService['info']> {
    this.logger.info(parameters, message);
  }

  public warn(
    message: string,
    parameters: Record<string, unknown> = {},
  ): ReturnType<LoggerService['warn']> {
    this.logger.warn(parameters, message);
  }
}

export { Logger };
