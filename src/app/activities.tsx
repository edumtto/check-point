'use client';
import styles from './activities.module.css'
// import './activities.module.css'
import { useState } from 'react';

export class Activity {
  name: string;
  description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}

export function ActivitiesScene({ activities }: { activities: Array<Activity> }) {
    const activityItems = activities.map((val, index) => 
    <li className={styles['activity-list']} key={val.name}>
      <button className={styles['activity-cell']} onClick={() => handleClick(val)}>
        {val.name} - {val.description}
      </button>
    </li>
   );
    return (
      <ul>{activityItems}</ul>
    );
  }
  
  function handleClick(activity: Activity) {
    console.log(activity);
    //setSelectedActivity({ activity: activity });
  }


// const [selectedActivity, setSelectedActivity] = useState<{ activity: null | Activity }>({activity: null});
