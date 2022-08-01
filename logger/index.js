
const { createLogger, format, transports, error } = require('winston');
const { combine, timestamp, label, printf, errors, colorize, prettyPrint } = format;
const WinstonLogStash = require('../modules/logstash_transport');

function loggerSettings() {
  return createLogger({
    transports: [
      new WinstonLogStash({
        mode: 'udp',
        host: '127.0.0.1',
        port: 8080,
        level: 'debug',
        data: {
          service: 'user',
          user: 'nandan'
        }
      })
    ],
    level: 'debug',
  });
}

module.exports = logger = loggerSettings();
