const winston = require('winston');
const appRoot = require('app-root-path');

//using NPM winston logger to log each each in a file in the log folder
const logConfig = {
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: `${appRoot.path}/logs/search-logs.json`,
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ),
            maxsize: 5242880,
            maxFiles: 5,
        })
    ]
};

const logger = winston.createLogger(logConfig);

const logSearch = (searchPhrase, username) => {
  logger.info({
  message: 'Search query executed',
  searchPhrase: searchPhrase,
  username: username
  });
};

module.exports = {
  logger,
  logSearch
}