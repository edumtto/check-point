'use client'
import type { v4 as uuidv4 } from 'uuid'

export class PersonName {
  firstName: string
  middleName: string
  lastName: string

  constructor (firstName: string, middleName: string, lastName: string) {
    this.firstName = firstName
    this.middleName = middleName
    this.lastName = lastName
  }

  fullName (): string {
    return this.firstName + ' ' + this.middleName + ' ' + this.lastName
  }
}

export class Member {
  id: typeof uuidv4
  name: PersonName

  constructor (id: typeof uuidv4, name: PersonName) {
    this.id = id
    this.name = name
  }

  fullName (): string {
    return this.name.fullName()
  }
}
