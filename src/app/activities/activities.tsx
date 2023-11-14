'use client';
import { Participant } from '../participants/participants';
import styles from './activities.module.css'

enum ActionType {
  CHECKIN,
  CHECKOUT
}

class ParticipantAction {
  actionType: ActionType;
  time: number; // Timestamp type
  
  constructor(actionType: ActionType, time: number) {
    this.actionType = actionType;
    this.time = time;
  }
}

class ActivityParticipant {
  participant: Participant;
  actions: Array<ParticipantAction>;

  constructor(participant: Participant) {
    this.participant = participant;
    this.actions = [];
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
  participants: Array<ActivityParticipant>;
  // TODO: id, date, time, room, numberOfParticipants

  constructor(name: string, description: string, dateTime: Date, lengthInMinutes: number) {
    this.name = name;
    this.description = description;
    this.dateTime = dateTime;
    this.lengthInMinutes = lengthInMinutes;
    this.participants = [];
  }

  addParticipant(participant: Participant) {
    this.participants.push(new ActivityParticipant(participant));
  }
}

function ActivityItem({ activity, setSelectedActivity }: { activity: Activity, setSelectedActivity: (value: Activity) => void }) {
  return (
    <li className={styles['activity-item']} key={activity.name}>
      <p className={styles['activity-time']}>{activity.dateTime.getHours()}:{activity.dateTime.getMinutes()}</p>
      <button className={styles['activity-content']} onClick={() => setSelectedActivity(activity)}>
        <h4>{activity.name}</h4>
        <p>{activity.description}</p>
      </button>
    </li>
  )
}

export function ActivitiesScene({ activities, setSelectedActivity }: { activities: Array<Activity>, setSelectedActivity: (value: Activity) => void }) {

  const activityItems = activities.map((val, index) =>
    <ActivityItem activity={val} setSelectedActivity={setSelectedActivity} />
  );

  return (
    <ul>{activityItems}</ul>
  );
}
