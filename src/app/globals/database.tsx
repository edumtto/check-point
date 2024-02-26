import { v4 as uuidv4 } from 'uuid'
import { Activity, Participant } from './models/activity'
import { Member, PersonName } from './models/member'

class Database {
  members: Member[] = [
    new Member(uuidv4(), new PersonName('Antonio', '', 'Gomez')),
    new Member(uuidv4(), new PersonName('Carlos', '', 'Rodriguez')),
    new Member(uuidv4(), new PersonName('Barbara', '', 'Smith')),
    new Member(uuidv4(), new PersonName('Daniel', '', 'Rodrigo')),
    new Member(uuidv4(), new PersonName('Marc', '', 'Lopes'))
  ]

  zumbaParticipants: Participant[] = [
    new Participant(this.members[0]),
    new Participant(this.members[1]),
    new Participant(this.members[2]),
    new Participant(this.members[3])
  ]

  chairACiseParticipants: Participant[] = [
    new Participant(this.members[1]),
    new Participant(this.members[2]),
    new Participant(this.members[3]),
    new Participant(this.members[4])
  ]

  activities: Activity[] = [
    new Activity(uuidv4(), 'Zumba', 'Latin music dance class.', new Date(2023, 10, 17, 14, 15, 0, 0), 60, this.zumbaParticipants),
    new Activity(uuidv4(), 'Chair-a-cise and a long name for the type of activity', 'Exercises in a chair.', new Date(2023, 10, 18, 11, 15, 0, 0), 60, this.chairACiseParticipants),
    new Activity(uuidv4(), 'Zumba Gold', 'Latin music dance class.', new Date(2023, 10, 17, 14, 15, 0, 0), 60, this.zumbaParticipants),
    new Activity(uuidv4(), 'Yoga', 'Mind and body practice that can build strength and flexibility', new Date(2023, 10, 18, 11, 15, 0, 0), 60, this.chairACiseParticipants),
    new Activity(uuidv4(), 'Line Dancing', 'Choreographed group dance.', new Date(2023, 10, 17, 14, 15, 0, 0), 60, this.zumbaParticipants),
    new Activity(uuidv4(), 'Book Club', 'bla bla bla', new Date(2023, 10, 18, 11, 15, 0, 0), 60, this.chairACiseParticipants),
    new Activity(uuidv4(), 'Movie Session', 'Latin music dance class.', new Date(2023, 10, 17, 14, 15, 0, 0), 60, this.zumbaParticipants),
    new Activity(uuidv4(), 'Coffee Social', 'bla bla bla', new Date(2023, 10, 18, 11, 15, 0, 0), 60, this.chairACiseParticipants),
    new Activity(uuidv4(), 'Craft and Chat', 'Latin music dance class.', new Date(2023, 10, 17, 14, 15, 0, 0), 60, this.zumbaParticipants),
    new Activity(uuidv4(), 'DrumFit', 'bla bla bla', new Date(2023, 10, 18, 11, 15, 0, 0), 60, this.chairACiseParticipants),
    new Activity(uuidv4(), 'Zumba', 'Latin music dance class.', new Date(2023, 10, 17, 14, 15, 0, 0), 60, this.zumbaParticipants),
    new Activity(uuidv4(), 'Chair-a-cise', 'bla bla bla', new Date(2023, 10, 18, 11, 15, 0, 0), 60, this.chairACiseParticipants)
  ]

  getActivity (id: uuidv4): Activity | undefined {
    return this.activities.find((activity) => activity.id === id)
  }
}

export const database = new Database()
