'use client'

import type { Member } from './member'
import { v4 as uuidv4 } from 'uuid'

export enum ActionType {
  CHECK_IN,
  CHECK_OUT
}

export class ParticipantAction {
  actionType: ActionType
  dateTime: Date

  constructor (actionType: ActionType, dateTime: Date) {
    this.actionType = actionType
    this.dateTime = dateTime
  }

  description (): string {
    const actionName = this.actionType === ActionType.CHECK_IN ? 'Check In' : 'Check Out'
    const actionTime = this.dateTime.toLocaleTimeString()
    return actionName + ' at ' + actionTime
  }
}

export class Participant {
  member: Member
  // actions: ParticipantAction[]
  checkInDate: Date | null
  checkOutDate: Date | null

  constructor (member: Member) {
    this.member = member
    this.checkInDate = null
    this.checkOutDate = null
  }

  isCheckedIn (): boolean {
    return this.checkInDate !== null
  }

  isCheckedOut (): boolean {
    return this.checkOutDate !== null
  }

  // action (): [string, string] {
  //   if (this.actions.length === 0) {
  //     return ['Check in', 'rgb(190, 255, 190)']
  //   } else if (this.actions[this.actions.length - 1].actionType === ActionType.CHECKIN) {
  //     return ['Check out', 'rgb(210, 210, 209)']
  //   }
  //   return ['Undo', 'white']
  // }

  lastAction (): ParticipantAction | null {
    if (this.checkOutDate !== null) {
      return new ParticipantAction(ActionType.CHECK_OUT, this.checkOutDate)
    } else if (this.checkInDate !== null) {
      return new ParticipantAction(ActionType.CHECK_IN, this.checkInDate)
    } else {
      return null
    }
  }

  undoLastAction (): void {
    if (this.checkOutDate !== null) {
      this.checkOutDate = null
    } else if (this.checkInDate !== null) {
      this.checkInDate = null
    }
  }

  checkIn (): void {
    this.checkInDate = new Date()
  }

  checkOut (): void {
    this.checkOutDate = new Date()
  }
}

export class Room {
  id: string
  name: string

  constructor (name: string) {
    this.id = uuidv4()
    this.name = name
  }
}

export class Activity {
  id: string
  name: string
  description: string
  startDateTime: Date
  lengthInMinutes: number
  participants: Participant[]
  room: Room

  constructor (name: string, description: string, startDateTime: Date, lengthInMinutes: number, room: Room, participants: Participant[]) {
    this.id = uuidv4()
    this.name = name
    this.description = description
    this.startDateTime = startDateTime
    this.lengthInMinutes = lengthInMinutes
    this.room = room
    this.participants = participants
  }

  startTime (): string {
    return this.startDateTime.getHours() + ':' + this.startDateTime.getMinutes()
  }

  endTime (): string {
    const endDate = new Date(this.startDateTime.getTime() + this.lengthInMinutes * 60000)
    return endDate.getHours() + ':' + endDate.getMinutes()
  }

  addParticipant (participant: Member): void {
    this.participants.push(new Participant(participant))
  }

  getParticipant (id: number): Participant | undefined {
    return this.participants.find((p) => p.member.id === id)
  }
}
