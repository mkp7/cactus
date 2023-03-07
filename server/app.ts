import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import initDb from './initDb'
import {
  createCollection,
  createCollectionTable,
  fetchCollections,
  getAllEntityData,
  createEntityRecord,
  getSchemaForEntity,
} from './models/collections'
import collectionSchema from './jsonSchemas/collections'
import createJsonSchema from './jsonSchemas/createJsonSchema'
import Ajv from 'ajv'
import cors from 'cors'
import { createId } from '@paralleldrive/cuid2'
const ajv = new Ajv()

initDb()

dotenv.config()

const app: Express = express()
app.use(express.json())
const port = process.env.PORT || 3000

const validateCollection = ajv.compile(collectionSchema)

const whiteList = ['http://localhost:5173']
app.use(
  cors({
    origin: whiteList,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'],
    credentials: true,
  })
)

app.get('/collections', async (req: Request, res: Response) => {
  try {
    let result: any = await fetchCollections()
    if (result?.error) {
      return res.status(400).json({
        message: 'bad data',
      })
    }

    return res.json({ message: 'ok', data: result })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      message: 'server error',
    })
  }
})

app.post('/collections', async (req: Request, res: Response) => {
  const id = createId()
  const isCollectionValid = validateCollection(req.body)
  if (!isCollectionValid) {
    return res.status(400).json({
      message: 'bad data',
    })
  }

  try {
    let result: any = await createCollection({ id, ...req.body })
    if (result.error) {
      return res.status(400).json({
        message: 'bad data',
      })
    }

    result = await createCollectionTable(req.body)
    if (result.error) {
      return res.status(400).json({
        message: 'bad data',
      })
    }

    return res.json({ id })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'server error',
    })
  }
})

app.get('/api/:entity', async (request: Request, response: Response) => {
  try {
    const data = await getAllEntityData(request.params['entity'])
    response.json({ data })
  } catch (error) {
    return response.status(500).json({
      message: 'server error',
    })
  }
})

app.post('/api/:entity', async (request: Request, response: Response) => {
  const entity = request.params['entity']
  const entityObject = request.body

  try {
    const columns = await getSchemaForEntity(entity)
    const columnsSchema = JSON.parse(columns[0].schema)

    const columnsJsonschema = createJsonSchema(columnsSchema)

    const validate = ajv.compile(columnsJsonschema)
    const valid = validate(entityObject)

    if (!valid) {
      console.log(validate.errors)
      return response.status(400).json({ errors: validate.errors })
    }

    const id = await createEntityRecord(entity, entityObject)

    return response.json({ id })
  } catch (error) {
    console.log(error)
    return response.status(500).json({
      message: 'server error',
    })
  }
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
