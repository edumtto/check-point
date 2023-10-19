'use client';
import styles from './activities.module.css'

export class Activity {
  name: string;
  description: string;
  dateTime: Date;
  lengthInMinutes: number;
  // TODO: id, date, time, room, numberOfParticipants

  constructor(name: string, description: string, dateTime: Date, lengthInMinutes: number) {
    this.name = name;
    this.description = description;
    this.dateTime = dateTime;
    this.lengthInMinutes = lengthInMinutes;
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
