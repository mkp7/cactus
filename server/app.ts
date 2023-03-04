import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import fs from 'node:fs'
import sqlite3 from "sqlite3"

const filepath = "./data.db";

const db = new sqlite3.Database(filepath);

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

async function runSqlFile() {
  const dataSql = fs.readFileSync("./init.sql").toString();
  const query = await db.run(dataSql, (err:any) => {
    if(err) {
      throw err;
    } else {
      console.log("query successful")
    }
  })
}
runSqlFile()


app.post('/collection', (req: Request, res: Response) => {
  // createTable()
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
