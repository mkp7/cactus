import sqlite3 from 'sqlite3'

const databaseFile = './data.db'
const db = new sqlite3.Database(databaseFile)

export default db