import * as request from 'request-promise';
import { createLogger, transports, format, Logger } from 'winston';

import { config } from './config';

function rp(body: object) {
  const options = {
    uri: `http://localhost:${config.PORT}${config.GRAPHQL_ROUTE}`,
    method: 'POST',
    json: true,
    body
  };

  return request(options);
}

function createAppLogger(): Logger {
  const { combine, timestamp, printf, colorize } = format;

  return createLogger({
    format: combine(
      colorize(),
      timestamp(),
      printf(
        (info): string => {
          return `${info.timestamp} [${info.level}] : ${JSON.stringify(info.message)}`;
        }
      )
    ),
    transports: [new transports.Console()]
  });
}

const logger: Logger = createAppLogger();

export { rp, logger };
