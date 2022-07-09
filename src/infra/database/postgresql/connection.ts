import { Client } from 'pg'

import { Connection } from './protocols'

export class PostgreSQLConnection implements Connection {
  readonly db: Client

  constructor () {
    this.db = new Client({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT)
    })
  }

  async open (): Promise<boolean> {
    await this.db.connect()
    return true
  }

  async query (sql: string): Promise<any> {
    const result = await this.db.query(sql)
    console.log(result)
    return result.rows
  }
  
  async close (): Promise<boolean> {
    await this.db.end()
    return true
  }
}
