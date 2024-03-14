import { sql } from '@vercel/postgres'

class Api {
  async getNewMembers (): Promise<void> {
    try {
      const { rows } = await sql`SELECT * from member`
      const json = JSON.stringify(rows)
      console.log(json)
    } catch (error) {
      console.log(error)
    }
  }
}

export const api = new Api()
