import fs from 'node:fs'
import sqlite3 from 'sqlite3'

export default async function initDb() {
  const databaseFile = './data.db'

  try {
    await fs.promises.access(databaseFile)
    console.log('database already initialized')
  } catch {
    const dataSql = await fs.promises.readFile('./init.sql', {
      encoding: 'utf-8',
    })
    const db = new sqlite3.Database(databaseFile)
    db.run(dataSql, (err: any) => {
      if (err) {
        throw err
      }
      console.log('database initialized successfully')
    })
  }
}
