import { DataSource } from 'typeorm'

import entities from "../entities"

export const AppDataSource = new DataSource({
  type: "mysql",
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: "teste-db",
  entities: entities,
  migrations: [__dirname + "/migrations/*.ts"]
})