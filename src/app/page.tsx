// import Image from 'next/image'
'use client';
import styles from './page.module.css'
import { v4 as uuidv4 } from 'uuid';
import { Activity, ActivitiesScene } from './activities/activities';
import { Participant, ParticipantsScene } from './participants/participants';
import { useState } from 'react';


const activitiesDB = [
  new Activity("Zumba", "Dance class."),
  new Activity("Chair-a-cise", "Exercise in chair.")
];

const participantsDB = [
  new Participant(uuidv4(), "Maria"),
  new Participant(uuidv4(), "Robert"),
  new Participant(uuidv4(), "James"),
  new Participant(uuidv4(), "Olivia"),
  new Participant(uuidv4(), "Marc")
];

export default function Home() {
  
  const nullActivity = new Activity("", "");
  const [ selectedActivity, setSelectedActivity ] = useState(nullActivity);

  if (selectedActivity.name != "") {
    return (
      <main>
        <NavigationBar />
        <ParticipantsScene activity={selectedActivity} participants={participantsDB} setSelectedActivity={setSelectedActivity} />
      </main>
    )
  }
  return (
    <main>
      <NavigationBar />
      <ActivitiesScene activities={activitiesDB} setSelectedActivity={setSelectedActivity}/>
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


