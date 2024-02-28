'use client'
import { v4 as uuidv4 } from 'uuid'

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
  id: string
  name: PersonName

  constructor (name: PersonName) {
    this.id = uuidv4()
    this.name = name
  }

  fullName (): string {
    return this.name.fullName()
  }
}
