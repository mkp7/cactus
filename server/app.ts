import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import initDb from './initDb'
import { createCollection, createCollectionTable, fetchCollections } from './models/collections'
import collectionSchema from './jsonSchemas/collections'
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
		// console.log({result});
		
  } catch (error) {
		console.log(error);
		
    return res.status(500).json({
      message: 'server error',
    })
  }
})

app.post('/collections', async (req: Request, res: Response) => {
  const id = createId()
  const isCollectionValid = validateCollection(req.body)
  if (!isCollectionValid) {
    console.log('invalid')
    return res.status(400).json({
      message: 'bad data',
    })
  }

  try {
    let result: any = await createCollection({ id, ...req.body })
    if (result.error) {
    console.log('error')
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

    return res.json({ message: 'ok' })
  } catch (error) {
    return res.status(500).json({
      message: 'server error',
    })
  }
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
