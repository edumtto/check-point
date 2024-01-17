'use client'

import type { Member } from './member'

export enum ActionType {
  CHECKIN,
  CHECKOUT
}

export class ParticipantAction {
  actionType: ActionType
  time: number // Timestamp type

  constructor (actionType: ActionType, time: number) {
    this.actionType = actionType
    this.time = time
  }
}

export class Participant {
  member: Member
  actions: ParticipantAction[]

  constructor (member: Member) {
    this.member = member
    this.actions = []
  }

  isCheckedIn (): boolean {
    if (this.actions.length === 0) {
      return false
    } else {
      return (this.actions[this.actions.length - 1].actionType === ActionType.CHECKIN)
    }
  }

  status (): string {
    if (this.actions.length === 0) {
      return 'unchecked'
    } else if (this.actions[this.actions.length - 1].actionType === ActionType.CHECKIN) {
      return 'checked in'
    } else {
      return 'checked out'
    }
  }

  checkIn (): void {
    this.actions.push(new ParticipantAction(ActionType.CHECKIN, Date.now()))
  }

  checkOut (): void {
    this.actions.push(new ParticipantAction(ActionType.CHECKOUT, Date.now()))
  }
}

export class Activity {
  name: string
  description: string
  dateTime: Date
  lengthInMinutes: number
  participants: Participant[]
  // TODO: id, date, time, room, numberOfParticipants

  constructor (name: string, description: string, dateTime: Date, lengthInMinutes: number, participants: Array<Participant>) {
    this.name = name
    this.description = description
    this.dateTime = dateTime
    this.lengthInMinutes = lengthInMinutes
    this.participants = participants
  }

  addParticipant (participant: Member): void {
    this.participants.push(new Participant(participant))
  }
}
