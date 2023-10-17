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

// function ActivityCellContent(activity: Activity) {
//   return (
//     <div>

//     </div>
//   )
// }

export function ActivitiesScene({ activities, setSelectedActivity}: { activities: Array<Activity>, setSelectedActivity: (value: Activity) => void}) {

  const activityItems = activities.map((val, index) => 
    <li className={styles['activity-item']} key={val.name}>
      <p className={styles['activity-time']}>{val.dateTime.getHours()}:{val.dateTime.getMinutes()}</p>
      <button className={styles['activity-content']} onClick={() => setSelectedActivity(val)}>
        <h4>{val.name}</h4>
        <p>{val.description}</p>
      </button>
    </li>
  );

  return (
    <div className='content'>
      <ul>{activityItems}</ul>
    </div>
  );
}
