import fs from 'fs'
import mysql from 'mysql2/promise'

export type ServiceName = 'print-questionnaires' | 'ml-admin' | 'edit-content' | 'adverts' | 'admin'

type DbConfigRelation = {
  [key in ServiceName]?: DbConfig
}

interface JsonConfig {
  database: JsonDatabaseConfig
}

interface JsonDatabaseConfig extends DbConfigRelation {
  host?: string
  username?: string
  password?: string
}

interface DbConfig {
  host?: string
  username?: string
  password?: string
  database?: string
}

let config: JsonConfig

async function getConfig(fileLocation: string): Promise<JsonConfig> {
  if (config) {
    return config
  }
  try {
    const read = await fs.promises.readFile(fileLocation, 'utf8')
    config = JSON.parse(read)
    return config
  } catch (err) {
    return { "database": {} }
  }
}

export async function createConnectionFor(fileLocation: string, serviceName: ServiceName, db?: string): Promise<mysql.Connection> {
  const config = (await getConfig(fileLocation)).database
  const host = config[serviceName]?.host ?? config.host ?? 'localhost'
  const user = config[serviceName]?.username ?? config.username ?? 'user'
  const password = config[serviceName]?.password ?? config.password ?? 'password'
  const database = db ?? config[serviceName]?.database
  return await mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database
  })
}
