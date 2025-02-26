const log = require("loglevel");
const colors = require("colors");

log.setLevel(process.env.NODE_ENV === "production" ? "warn" : "debug");

const logger = {
  info: (message, meta = {}) =>
    log.info(colors.blue(JSON.stringify({ level: "info", message, ...meta }))),
  warn: (message, meta = {}) =>
    log.warn(colors.yellow(JSON.stringify({ level: "warn", message, ...meta }))),
  error: (message, meta = {}) =>
    log.error(colors.red(JSON.stringify({ level: "error", message, ...meta }))),
  debug: (message, meta = {}) =>
    log.debug(colors.green(JSON.stringify({ level: "debug", message, ...meta }))),
};

module.exports = logger;
