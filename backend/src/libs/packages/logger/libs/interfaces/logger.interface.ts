type LogFunction = (
  message: string,
  parameters?: Record<string, unknown>,
) => void;

interface LoggerService {
  info: LogFunction;
  warn: LogFunction;
  error: LogFunction;
  debug: LogFunction;
}

export { type LoggerService };
