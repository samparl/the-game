// import * as fs from 'fs';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Request, Response } from 'express';
import * as path from 'path';
import Routes from './routes';

const server = express();
const PORT = 4040;

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(express.static(path.resolve(__dirname, '..')))
server.use('/api', Routes);

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})