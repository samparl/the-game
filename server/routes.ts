import { Request, Response, Router } from 'express';
import * as parse from 'csv-parse';
import * as fs from 'fs';
import * as path from 'path';

const Routes = Router();
const filepath = path.resolve('./characters.csv');

const characters: any[] = [];
const stream = parse({}, (error: any, data: any) => {
  const fieldNames = data[0];
  for (let i = 1; i < data.length; i++) {
    const line = data[i];
    const character: any = {};
    line.forEach((field: any, index: any) => {
      const fieldName = fieldNames[index];
      character[fieldName] = field;
    });
    characters.push(character);
  }
});

fs.createReadStream('./server/characters.csv', 'utf8').pipe(stream)

Routes.get('/characters', (req: Request, res: Response) => {
  res.send(characters.slice(0, 42));
})

Routes.get('/characters/:character', (req: Request, res: Response) => { 
  res.send(characters.find(character => character['S.No'] === req.params.character));
})

export default Routes;