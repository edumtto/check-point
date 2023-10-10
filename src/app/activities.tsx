'use client';
// import styles from './page.module.css'
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
    <li key={val.name}>
      <button onClick={() => handleClick(val)}>
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
