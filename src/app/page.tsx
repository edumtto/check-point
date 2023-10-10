// import Image from 'next/image'
import styles from './page.module.css'

'use client';

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
    <h1>CheckPoint</h1>
  );
}


