import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import initDb from './initDb';

initDb()

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.post('/collection', (req: Request, res: Response) => {
  // createTable()
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
