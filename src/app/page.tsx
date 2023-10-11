// import Image from 'next/image'
'use client';
import styles from './page.module.css'
import { Activity, ActivitiesScene } from './activities';

const activities = [
  new Activity("Zumba", "Dance class."),
  new Activity("Chair-a-cise", "Exercise in chair.")
];

export default function Home() {
  
  // if (selectedActivity.activity != null) {
  //   return (
  //     <main>
  //       <NavigationBar />
  //       <p>Activity {selectedActivity.activity.name}</p>
  //     </main>
  //   )
  // }
  return (
    <main>
      <NavigationBar />
      <ActivitiesScene activities={activities} />
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


