// import Image from 'next/image'
'use client';
import styles from './page.module.css'
import { Activity, ActivitiesScene } from './activities/activities';
import { useState } from 'react';

const activities = [
  new Activity("Zumba", "Dance class."),
  new Activity("Chair-a-cise", "Exercise in chair.")
];

export default function Home() {
  
  const nullActivity = new Activity("", "");
  const [ selectedActivity, setSelectedActivity ] = useState(nullActivity);

  if (selectedActivity.name != "") {
    return (
      <main>
        <NavigationBar />
        <p>Activity {selectedActivity.name}</p>
      </main>
    )
  }
  return (
    <main>
      <NavigationBar />
      <ActivitiesScene activities={activities} setSelectedActivity={setSelectedActivity}/>
    </main>
  );
}

function NavigationBar() {
  return (
    <div className={styles["navbar"]}>
        <h1 className={styles["navbar-title"]}>CheckPoint</h1>
    </div>
  );
}


