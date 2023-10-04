const { createLogger, format, transports } = require("winston");

// https://github.com/winstonjs/winston#logging
// { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
// eslint-disable-next-line no-undef
const level = process.env.LOG_LEVEL || "debug";

function formatParams(info) {
  const { timestamp, level, message, ...args } = info;
  const ts = timestamp.slice(0, 19).replace("T", " ");

  return `${ts} ${level}: ${message} ${
    Object.keys(args).length ? JSON.stringify(args, "", "") : ""
  }`;
}

// https://github.com/winstonjs/winston/issues/1135
const developmentFormat = format.combine(
  format.colorize(),
  format.timestamp(),
  format.align(),
  format.printf(formatParams)
);

const productionFormat = format.combine(
  format.timestamp(),
  format.align(),
  format.printf(formatParams)
);

const logTransports = [];
let logFormat;

// Added for backward compatibility
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === "production") {
  logFormat = productionFormat;
  logTransports.push(
    new transports.File({ filename: "error.log", level: "error" }),
    new transports.File({ filename: "combined.log" })
  );
  logTransports.push(new transports.Console());
} else {
  // eslint-disable-next-line no-undef
  switch (String(process.env.APP_ENV).toUpperCase()) {
    case "PRODUCTION":
      logFormat = productionFormat;
      logTransports.push(
        new transports.File({ filename: "error.log", level: "error" }),
        new transports.File({ filename: "combined.log" })
      );
      break;
    case "TEST":
      logFormat = developmentFormat;
      logTransports.push(
        new transports.File({
          filename: "test-logs/error.log",
          level: "error",
        }),
        new transports.File({ filename: "test-logs/combined.log" })
      );
      break;
    default:
      logFormat = developmentFormat;
      logTransports.push(new transports.Console());
  }
}

const logger = createLogger({
  level: level,
  format: logFormat,
  transports: logTransports,
});

module.exports = logger;
