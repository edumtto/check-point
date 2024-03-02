import { Activity, Participant } from './models/activity'
import { Member, PersonName } from './models/member'

class Database {
  members: Member[] = [
    new Member(new PersonName('Antonio', '', 'Gomez')),
    new Member(new PersonName('Carlos', '', 'Rodriguez')),
    new Member(new PersonName('Barbara', '', 'Smith')),
    new Member(new PersonName('Daniel', '', 'Rodrigo')),
    new Member(new PersonName('Marc', '', 'Lopes')),
    new Member(new PersonName('Maria', '', 'Christina')),
    new Member(new PersonName('Emanuele', '', 'Oliveira')),
    new Member(new PersonName('James', '', 'Smith')),
    new Member(new PersonName('Frederich', '', 'Scarlet')),
    new Member(new PersonName('Chris', '', 'Croft')),
    new Member(new PersonName('Sophia', '', 'Vergara')),
    new Member(new PersonName('Ed', '', 'Sheeran')),
    new Member(new PersonName('Simon', '', 'Web')),
    new Member(new PersonName('Laura', '', 'Pausini')),
    new Member(new PersonName('Esther', '', 'Dean'))
  ]

  zumbaParticipants: Participant[] = [
    new Participant(this.members[0]),
    new Participant(this.members[1]),
    new Participant(this.members[2]),
    new Participant(this.members[3]),
    new Participant(this.members[4]),
    new Participant(this.members[5]),
    new Participant(this.members[6]),
    new Participant(this.members[7]),
    new Participant(this.members[8]),
    new Participant(this.members[9]),
    new Participant(this.members[10]),
    new Participant(this.members[11]),
    new Participant(this.members[12]),
    new Participant(this.members[13])
  ]

  chairACiseParticipants: Participant[] = [
    new Participant(this.members[1]),
    new Participant(this.members[2]),
    new Participant(this.members[3]),
    new Participant(this.members[5])
  ]

  activities: Activity[] = [
    new Activity('Zumba', 'Latin music dance class.', new Date(2023, 10, 17, 14, 15, 0, 0), 60, this.zumbaParticipants),
    new Activity('Chair-a-cise and a long name for the type of activity', 'Exercises in a chair.', new Date(2023, 10, 18, 11, 15, 0, 0), 60, this.chairACiseParticipants),
    new Activity('Zumba Gold', 'Latin music dance class.', new Date(2023, 10, 17, 14, 15, 0, 0), 60, this.zumbaParticipants),
    new Activity('Yoga', 'Mind and body practice that can build strength and flexibility', new Date(2023, 10, 18, 11, 15, 0, 0), 60, this.chairACiseParticipants),
    new Activity('Line Dancing', 'Choreographed group dance.', new Date(2023, 10, 17, 14, 15, 0, 0), 60, this.zumbaParticipants),
    new Activity('Book Club', 'bla bla bla', new Date(2023, 10, 18, 11, 15, 0, 0), 60, this.chairACiseParticipants),
    new Activity('Movie Session', 'Latin music dance class.', new Date(2023, 10, 17, 14, 15, 0, 0), 60, this.zumbaParticipants),
    new Activity('Coffee Social', 'bla bla bla', new Date(2023, 10, 18, 11, 15, 0, 0), 60, this.chairACiseParticipants),
    new Activity('Craft and Chat', 'Latin music dance class.', new Date(2023, 10, 17, 14, 15, 0, 0), 60, this.zumbaParticipants),
    new Activity('DrumFit', 'bla bla bla', new Date(2023, 10, 18, 11, 15, 0, 0), 60, this.chairACiseParticipants),
    new Activity('Zumba', 'Latin music dance class.', new Date(2023, 10, 17, 14, 15, 0, 0), 60, this.zumbaParticipants),
    new Activity('Chair-a-cise', 'bla bla bla', new Date(2023, 10, 18, 11, 15, 0, 0), 60, this.chairACiseParticipants)
  ]

  getActivity (id: string): Activity | undefined {
    return this.activities.find((activity) => activity.id === id)
  }

  addMember (member: Member): void {
    this.members.push(member)
    console.log(this.members)
  }
}

export const database = new Database()

class AppState {
  lastActiveTab: string

  constructor() {
    this.lastActiveTab = '0'
  }
}

export const appState = new AppState()
