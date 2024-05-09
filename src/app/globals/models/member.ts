'use client'

export class Member {
  id: number
  firstName: string
  lastName: string
  genderId: number
  address: string
  comments: string | null

  constructor (id: number, firstName: string, lastName: string, genderId: number, address: string, comments: string | null) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.genderId = genderId
    this.address = address
    this.comments = comments
  }

  fullName (): string {
    return this.firstName + ' ' + this.lastName
  }

  gender (): string {
    switch (this.genderId) {
      case 1:
        return 'Male'
      case 2:
        return 'Female'
      case 3:
        return 'Other'
      default:
        return ''
    }
  }
}
