import { resolve } from 'path'
import db from '../db'
import Ajv from 'ajv'
import { createId } from '@paralleldrive/cuid2'
import createJsonSchema from '../jsonSchemas/createJsonSchema'
const ajv = new Ajv()

export async function createCollection(collection: any) {
  const statement = db.prepare(
    'INSERT INTO _collections(id, name, schema) values(?, ?, ?);'
  )
  return new Promise((resolve, reject) => {
    statement.run(
      [collection.id, collection.name, JSON.stringify(collection.schema)],
      (result, err) => {
        if (result !== null && result.errno) {
          resolve({ error: 'client error' })
        }
        err ? reject(err) : resolve(true)
      }
    )
  })
}

export async function fetchCollections() {
  const statement = 'SELECT id, name from _collections;'
  return new Promise((resolve, reject) => {
    db.all(statement, (err, result) => {
      err ? reject(err) : resolve(result)
    })
  })
}

const fieldTypesMap = {
  text: 'TEXT',
  number: 'INT',
  bool: 'INT',
}

export async function createCollectionTable(collection: any) {
  const query = `CREATE TABLE "${collection.name}" (
        "id"	TEXT NOT NULL,
        ${collection.schema
          .map(
            (entity) =>
              `"${entity.name}" ${fieldTypesMap[entity.type]} ${
                entity.required ? 'NOT NULL' : ''
              } ${entity.unique ? 'UNIQUE' : ''}`
          )
          .join(',')}
        , PRIMARY KEY("id")
    );`

  return new Promise((resolve, reject) => {
    db.run(query, (result, err) => {
      if (result !== null && result.errno) {
        resolve({ error: 'client error' })
      }
      err ? reject(err) : resolve(true)
    })
  })
}

export async function getAllEntityData(entity: string) {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM "${entity}"`, (err, result) => {
      err ? reject(err) : resolve(result)
    })
  })
}

export async function createEntityRecord(entity: any, entityObject: any) {
  const subquery = Object.entries(entityObject)
    .reduce(
      (acc, curr) => {
        return [
          [...acc[0], curr[0]],
          [...acc[1], `"${curr[1]}"`],
        ]
      },
      [[], []]
    )
    .map((s) => s.join(', '))

  const id = `"${createId()}"`

  const query = `INSERT INTO "${entity}" (
		id,
    ${subquery[0]}
		) VALUES ( ${id} , ${subquery[1]});`

  console.log('subquery', query)

  return new Promise((resolve, reject) => {
    db.run(query, (result, err) => {
      if (result !== null && result.errno) {
        resolve({ error: 'client error' })
      }
      err ? reject(err) : resolve(true)
    })
  })
}

export async function getSchemaForEntity(entity: any) {
  return new Promise((resolve, reject) =>
    db.all(
      `SELECT schema FROM _collections where name = '${entity}'`,
      (err, result) => {
        err ? reject(err) : resolve(result)
      }
    )
  )
}
