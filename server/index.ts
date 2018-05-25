// import * as fs from 'fs';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Request, Response } from 'express';
import Routes from './routes';

const server = express();
const PORT = 4040;

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use('/', Routes);

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})