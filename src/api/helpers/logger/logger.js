import { createLogger, format, transports } from "winston";

const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
};

const logger = createLogger({
  levels: logLevels,
  transports: [new transports.Console()],
});

const fatal = (message) => logger.fatal(message);
const error = (message, trace) => logger.error(message, trace);
const warn = (message) => logger.warn(message);
const info = (message) => logger.info(message);
const debug = (message) => logger.debug(message);
const trace = (message) => logger.trace(message);

export default { fatal, error, warn, info, debug, trace };
