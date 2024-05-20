'use client'

export class Member {
  id: number
  firstName: string
  lastName: string
  genderId: number
  address: string
  email: string
  comments: string | null
  birthday: Date
  createdAt: Date

  constructor (
    id: number,
    firstName: string,
    lastName: string,
    genderId: number,
    address: string,
    email: string,
    birthday: Date,
    createdAt: Date,
    comments: string | null
  ) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.genderId = genderId
    this.address = address
    this.email = email
    this.birthday = birthday
    this.createdAt = createdAt
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

  age (): string {
    const currentDate = new Date()
    const ageInMilliseconds = currentDate.getTime() - this.birthday.getTime()
    const millisecondsInYear = 1000 * 60 * 60 * 24 * 365.25 // Account for leap years
    const ageInYears = ageInMilliseconds / millisecondsInYear
    const age = Math.floor(ageInYears)
    return age.toString()
  }
}
