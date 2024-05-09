import { Activity, Participant, Room } from './models/activity'
import { Member } from './models/member'

class Database {
  members: Member[] = [
    new Member(0, 'Antonio', 'Gomez', 1, '', null),
    new Member(1, 'Carlos', 'Rodriguez', 1, '', null),
    new Member(2, 'Barbara', 'Smith', 2, '', null),
    new Member(3, 'Daniel', 'Rodrigo', 1, '', null),
    new Member(4, 'Marc', 'Lopes', 1, '', null),
    new Member(5, 'Maria', 'Christina', 2, '', null),
    new Member(6, 'Emanuele', 'Oliveira', 2, '', null),
    new Member(7, 'James', 'Smith', 1, '', null),
    new Member(8, 'Frederich', 'Scarlet', 1, '', null),
    new Member(9, 'Chris', 'Croft', 1, '', null),
    new Member(10, 'Sophia', 'Vergara', 2, '', null),
    new Member(11, 'Ed', 'Sheeran', 1, '', null),
    new Member(12, 'Simon', 'Web', 1, '', null),
    new Member(13, 'Laura', 'Pausini', 2, '', null),
    new Member(14, 'Esther', 'Dean', 2, '', null)
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

  rooms: Room[] = [
    new Room('Conference Room'),
    new Room('Natomas Room'),
    new Room('Dance Room'),
    new Room('Craft Room')
  ]

  activities: Activity[] = [
    new Activity('Zumba', 'Latin music dance class.', new Date(2023, 10, 17, 14, 15, 0, 0), 60, this.rooms[0], this.zumbaParticipants),
    new Activity('Chair-a-cise and a long name for the type of activity', 'Exercises in a chair.', new Date(2023, 10, 18, 11, 15, 0, 0), 60, this.rooms[1], this.chairACiseParticipants),
    new Activity('Zumba Gold', 'Latin music dance class.', new Date(2023, 10, 17, 14, 15, 0, 0), 60, this.rooms[2], this.zumbaParticipants),
    new Activity('Yoga', 'Mind and body practice that can build strength and flexibility', new Date(2023, 10, 18, 11, 15, 0, 0), 60, this.rooms[3], this.chairACiseParticipants),
    new Activity('Line Dancing', 'Choreographed group dance.', new Date(2023, 10, 17, 14, 15, 0, 0), 60, this.rooms[2], this.zumbaParticipants),
    new Activity('Book Club', 'bla bla bla', new Date(2023, 10, 18, 11, 15, 0, 0), 60, this.rooms[1], this.chairACiseParticipants),
    new Activity('Movie Session', 'Latin music dance class.', new Date(2023, 10, 17, 14, 15, 0, 0), 60, this.rooms[1], this.zumbaParticipants),
    new Activity('Coffee Social', 'bla bla bla', new Date(2023, 10, 18, 11, 15, 0, 0), 60, this.rooms[3], this.chairACiseParticipants),
    new Activity('Craft and Chat', 'Latin music dance class.', new Date(2023, 10, 17, 14, 15, 0, 0), 60, this.rooms[1], this.zumbaParticipants),
    new Activity('DrumFit', 'bla bla bla', new Date(2023, 10, 18, 11, 15, 0, 0), 60, this.rooms[0], this.chairACiseParticipants),
    new Activity('Zumba', 'Latin music dance class.', new Date(2023, 10, 17, 14, 15, 0, 0), 60, this.rooms[1], this.zumbaParticipants),
    new Activity('Chair-a-cise', 'bla bla bla', new Date(2023, 10, 18, 11, 15, 0, 0), 60, this.rooms[2], this.chairACiseParticipants)
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

  constructor () {
    this.lastActiveTab = '0'
  }
}

export const appState = new AppState()
