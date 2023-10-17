// import Image from 'next/image'
'use client';
import styles from './page.module.css'
import { v4 as uuidv4 } from 'uuid';
import { Activity, ActivitiesScene } from './activities/activities';
import { Participant, ParticipantsScene } from './participants/participants';
import { NavigationBar, SceneHeader } from './global-components/global-components';
import { useState } from 'react';


const activitiesDB = [
  new Activity("Zumba", "Latin music dance class.", new Date(2023, 10, 17, 14, 15, 0, 0), 60),
  new Activity("Chair-a-cise", "Exercises in a chair.", new Date(2023, 10, 18, 11, 15, 0, 0), 60)
];

const participantsDB = [
  new Participant(uuidv4(), "Maria"),
  new Participant(uuidv4(), "Robert"),
  new Participant(uuidv4(), "James"),
  new Participant(uuidv4(), "Olivia"),
  new Participant(uuidv4(), "Marc")
];

export default function Home() {
  
  const nullActivity = new Activity("", "", new Date(), 0);
  const [ selectedActivity, setSelectedActivity ] = useState(nullActivity);

  if (selectedActivity.name != "") {
    return (
      <main>
        <NavigationBar />
        <SceneHeader title={selectedActivity.name} showBackButton={true} handleBackButtonClick={handleBackButtonClick}/>
        <ParticipantsScene activity={selectedActivity} participants={participantsDB} />
      </main>
    )
  }
  return (
    <main>
      <NavigationBar />
      <SceneHeader title='Activities'/>
      <ActivitiesScene activities={activitiesDB} setSelectedActivity={setSelectedActivity}/>
    </main>
  );

  function handleBackButtonClick() {
      setSelectedActivity(nullActivity);
  }
}




