import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import { AppDataSource } from './database/data-source'
import routers from './routes/routes'

const app = express()

const port = 3001

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(routers)

app.get("/", (req, res) => {
  res.json({ message: "Welcome to API" });
});

app.listen(port, async () => {
  try {
    await AppDataSource.initialize()
    console.log('Database OK!')
    await AppDataSource.runMigrations()
    console.log('Migrations finished!')
    console.info(`🚀 Server ready at http://localhost:${port}`)
  } catch (err) {
    console.log(err)
  }
})