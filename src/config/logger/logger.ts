import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import CloudWatchTransport from 'winston-cloudwatch';

enum LogLevels {
  INFO = 'info',
  DEBUG = 'debug',
  WARN = 'warn',
  ERROR = 'error',
  VERBOSE = 'verbose',
}

@Injectable()
export class Logger implements LoggerService {
  private logger: winston.Logger;

  constructor(env: string) {
    this.logger = winston.createLogger({
      levels: winston.config.npm.levels,
      level: env === 'local' ? LogLevels.DEBUG : LogLevels.INFO,
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.colorize({
          colors: {
            info: 'cyan',
            debug: 'blue',
            error: 'red',
            warn: 'yellow',
          },
        }),
        winston.format.printf((info) => {
          return `${info.timestamp} [${info.level}] [${info.context}] ${info.message}`;
        }),
      ),
      transports: [
        new winston.transports.Console(),
        // new CloudWatchTransport({
        //   name: 'Cloudwatch Logs',
        //   logGroupName: process.env.CLOUDWATCH_GROUP_NAME,
        //   logStreamName: process.env.CLOUDWATCH_STREAM_NAME,
        //   awsAccessKeyId: process.env.AWS_ACCESS_KEY,
        //   awsSecretKey: process.env.AWS_KEY_SECRET,
        //   awsRegion: process.env.CLOUDWATCH_AWS_REGION,
        //   messageFormatter: function (item) {
        //     return (
        //       item.level + ': ' + item.message + ' ' + JSON.stringify(item.meta)
        //     );
        //   },
        // }),
      ],
    });
  }

  log(message: any, context: string): void {
    this.logger.log(LogLevels.INFO, { message, context });
  }
  error(message: any, context: string): void {
    this.logger.error(LogLevels.ERROR, { message, context });
  }
  warn(message: any, context: string) {
    this.logger.warn(LogLevels.WARN, { message, context });
  }
  debug(message: any, context: string) {
    this.logger.debug(LogLevels.DEBUG, { message, context });
  }
  verbose(message: any, context: string) {
    this.logger.verbose(LogLevels.VERBOSE, { message, context });
  }
}
