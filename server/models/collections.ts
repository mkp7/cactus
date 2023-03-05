import db from '../db'

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
    db.all(
      statement,
      (err, result) => {
        err ? reject(err) : resolve(result)
      }
    )
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
