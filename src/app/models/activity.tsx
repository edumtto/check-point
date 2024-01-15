'use client';

import { Member } from './member';

export enum ActionType {
    CHECKIN,
    CHECKOUT
}

export class ParticipantAction {
    actionType: ActionType;
    time: number; // Timestamp type

    constructor(actionType: ActionType, time: number) {
        this.actionType = actionType;
        this.time = time;
    }
}

export class Participant {
    member: Member;
    actions: Array<ParticipantAction>;

    constructor(member: Member) {
        this.member = member;
        this.actions = [];
    }

    isCheckedIn() {
      if (this.actions.length == 0)
        return false 
      else {
       return (this.actions[this.actions.length - 1].actionType === ActionType.CHECKIN)
      }
    }

    checkIn() {
        this.actions.push(new ParticipantAction(ActionType.CHECKIN, Date.now()))
    }

    checkOut() {
        this.actions.push(new ParticipantAction(ActionType.CHECKOUT, Date.now()))
    }
}

export class Activity {
    name: string;
    description: string;
    dateTime: Date;
    lengthInMinutes: number;
    participants: Array<Participant>;
    // TODO: id, date, time, room, numberOfParticipants

    constructor(name: string, description: string, dateTime: Date, lengthInMinutes: number, participants: Array<Participant>) {
        this.name = name;
        this.description = description;
        this.dateTime = dateTime;
        this.lengthInMinutes = lengthInMinutes;
        this.participants = participants;
    }

    addParticipant(participant: Member) {
        this.participants.push(new Participant(participant));
    }
}