import { createLogger, format, transports } from "winston";

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }), // only errors
    new winston.transports.File({ filename: 'logs/combined.log' }), // all logs
  ],
});

export default logger;