'use client'

import type { Member } from './member'

export enum ActionType {
  CHECKIN,
  CHECKOUT
}

export const ParticipantState = {
  CHECKED_IN: 'Checked in',
  CHECKED_OUT: 'Checked out',
  UNCHECKED: 'Unchecked'
}

export class ParticipantAction {
  actionType: ActionType
  dateTime: Date

  constructor (actionType: ActionType, dateTime: Date) {
    this.actionType = actionType
    this.dateTime = dateTime
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
    }
    return 'checked out'
  }

  lastAction (): ParticipantAction | null {
    if (this.actions.length === 0) {
      return null
    }
    return this.actions[this.actions.length - 1]
  }

  undoLastAction (): void {
    this.actions.pop()
  }

  checkIn (): void {
    this.actions.push(new ParticipantAction(ActionType.CHECKIN, new Date()))
  }

  checkOut (): void {
    this.actions.push(new ParticipantAction(ActionType.CHECKOUT, new Date()))
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
