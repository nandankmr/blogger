
const { createLogger, format, transports, error } = require('winston');
const { combine, timestamp, label, printf, errors, colorize, prettyPrint } = format;
const WinstonLogStash = require('../modules/logstash_transport');

const myFormat = printf((obj) => {
  return {
    timestamp: obj.timestamp,
    level: obj.level,
    message: obj.message,
    stack:{data: obj.stack},
  }
});

function loggerSettings() {
  return createLogger({
    // format: combine(
    //   errors({ 
    //     stack: true,
    //     // newline: false
    //   }), // <-- use errors format
    //   colorize(),
    //   timestamp(),
    //   prettyPrint(),
    //   myFormat
    // ),
    transports: [
      new transports.File({ filename: 'error.log', level: 'error' }),
      new transports.File({ filename: 'combined.log' }),
      // new transports.Console()
      new WinstonLogStash({
        mode: 'udp',
        host: '127.0.0.1',
        port: 8080,
        level: 'debug',
        data: {
          service: 'user'
        }
      })
    ],
    level: 'debug',
  });
}

module.exports = logger = loggerSettings();
