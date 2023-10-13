'use client';
import styles from './activities.module.css'

export class Activity {
  name: string;
  description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}

export function ActivitiesScene({ activities, setSelectedActivity}: { activities: Array<Activity>, setSelectedActivity: (value: Activity) => void}) {

  const activityItems = activities.map((val, index) => 
    <li className={styles['activity-list']} key={val.name}>
      <button className={styles['activity-cell']} onClick={() => setSelectedActivity(val)}>
        {val.name} - {val.description}
      </button>
    </li>
  );

  return (
    <div className='content'>
      <ul>{activityItems}</ul>
    </div>
  );
}
