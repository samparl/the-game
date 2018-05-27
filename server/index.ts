// import * as fs from 'fs';
import * as express from 'express';
import * as history from 'connect-history-api-fallback';
import * as bodyParser from 'body-parser';
import { Request, Response } from 'express';
import * as path from 'path';
import Routes from './routes';
import { logger } from './logger';

const server = express();
const PORT = 4040;

// Request and response handling
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

// Loggers
server.use(logger);

// Routing
server.use(history({
  // Make sure API calls aren't redirecting to the index file
  rewrites: [{
    from: /^\/api\/.*$/,
    to: (context) => context.parsedUrl.pathname || ''
  }],
  verbose: true,
}));
server.use('/api', Routes);
server.use(express.static(path.resolve(__dirname, '..')));

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})