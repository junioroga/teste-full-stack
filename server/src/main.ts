import express from 'express'
import bodyParser from 'body-parser'
import { DataSource } from 'typeorm'

import entities from "./entities"

const app = express()

const port = 3001

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

export const database = new DataSource({
    type: "mysql",
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: "teste-db",
    entities: entities,
    migrations: [__dirname + "/migrations/*.ts"]
})

app.listen(port, async () => {
    try {
        console.log(`server run in port = ${port}`)
        await database.initialize()
        console.log('data base running')
        await database.runMigrations()
        console.log('migrations finished')
    } catch (err) {
        console.log(err)
    }
})