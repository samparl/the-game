const morgan = require('morgan');
import { Logger, transports } from 'winston';
const split = require('split');

export const winston = new Logger({
  transports: [
    new transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    })
  ],
  exitOnError: false, // do not exit on handled exceptions
});

const stream = split().on('data', (message: any) => { winston.info(message); })

export const logger = morgan('combined', { stream });