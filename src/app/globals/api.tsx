// import { sql } from '@vercel/postgres'
import { Member } from '@/app/globals/models/member'
// import camelcaseKeysDeep from 'camelcase-keys-deep'

import { createPool } from '@vercel/postgres'
const pool = createPool({
  connectionString: 'postgres://default:nNtk6Dz5GxiV@ep-royal-glade-a4l0px34-pooler.us-east-1.aws.neon.tech/verceldb?sslmode=require'
})

// https://github.com/vercel/storage/tree/main/packages/postgres#a-note-for-vite-users

class Api {
  // const reviver = (key, value) => {
  //   if (key === camelcaseKeysDeep(key)) {
  //     return value
  //   }
  //   return undefined
  // }

  async getAllMembers (): Promise<Member[]> {
    const members: Member[] = []

    function formatAddress (addressData: any): string {
      return addressData.slice(1, -1).split(',').join(', ').replaceAll('"', '')
    }

    try {
      const { rows } = await pool.sql`SELECT * FROM member;`
      const json = JSON.stringify(rows)
      const data = JSON.parse(json)
      // const camelCaseData = camelcaseKeysDeep(data)
      data.forEach((row: any) => {
        const member = new Member(
          row.id,
          row.first_name,
          row.last_name,
          row.gender_id,
          formatAddress(row.address),
          row.email,
          new Date(row.birthday),
          new Date(row.created_at),
          row.comments
        )
        members.push(member)
      })
    } catch (error) {
      console.log(error)
    }

    return members
  }

  async deleteMember (memberId: number): Promise<null> {
    try {
      await pool.sql`DELETE FROM member WHERE id = ${memberId};`
    } catch (error) {
      console.log(error)
    }
    return null
  }

  async createMember (member: Member): Promise<null> {
    // console.log('>>>>Member: ' + member.firstName)
    // const query = `INSERT INTO member (first_name, last_name, email, birthday, address, gender_id) VALUES (
    // '${member.firstName}',
    // '${member.lastName}',
    // '${member.email}',
    // '${formatDateToPostgress(member.birthday)}',
    // '${member.address}',
    // '${member.genderId}'
    // );`

    const query = `INSERT INTO member (first_name, last_name, email, birthday, address, gender_id) VALUES (
      'Lara', 'Croft', 'lara@gmail.com','1995-12-10','3500 Mamie Jennings Way, Sacramento, CA','2'
    );`

    console.log('>>>>Query:\n' + query)

    await pool.query(query)

    return null
  }
}

function formatDateToPostgress (date: Date): string {
  const year = date.getFullYear().toString()
  const month = ('0' + (date.getMonth() + 1)).slice(-2)
  const day = ('0' + date.getDate()).slice(-2)

  return [year, month, day].join('-')
}

export const api = new Api()
