'use client'
import { React, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Activity, Participant } from './models/activity'
import { Member, PersonName } from './models/member'
import { ActivitiesScene } from './activities/activities'
import { ParticipantsScene } from './participants/participants'
import { NavigationBar, SceneHeader } from './global-components/global-components'
import { Menu } from 'antd'
import styles from './global-components/global-components.module.css'

const membersDB = [
  new Member(uuidv4(), new PersonName('Maria', '', 'Gomez')),
  new Member(uuidv4(), new PersonName('Robert', '', 'Rodriguez')),
  new Member(uuidv4(), new PersonName('James', '', 'Smith')),
  new Member(uuidv4(), new PersonName('Olivia', '', 'Rodrigo')),
  new Member(uuidv4(), new PersonName('Marc', '', 'Lopes'))
]

const zumbaParticipants: Participant[] = [
  new Participant(membersDB[0]),
  new Participant(membersDB[1]),
  new Participant(membersDB[2]),
  new Participant(membersDB[3])
]

const chairACiseParticipants: Participant[] = [
  new Participant(membersDB[1]),
  new Participant(membersDB[2]),
  new Participant(membersDB[3]),
  new Participant(membersDB[4])
]

const activitiesDB = [
  new Activity('Zumba', 'Latin music dance class.', new Date(2023, 10, 17, 14, 15, 0, 0), 60, zumbaParticipants),
  new Activity('Chair-a-cise', 'Exercises in a chair.', new Date(2023, 10, 18, 11, 15, 0, 0), 60, chairACiseParticipants)
]

export default function Home (): JSX.Element {
  const nullActivity = new Activity('', '', new Date(), 0, [])
  const [selectedActivity, setSelectedActivity] = useState(nullActivity)

  if (selectedActivity.name !== '') {
    return (
      <main>
        <NavigationBar />
        <SceneHeader title={selectedActivity.name} showBackButton={true} handleBackButtonClick={handleBackButtonClick} />
        <ParticipantsScene activity={selectedActivity} />
      </main>
    )
  }

  return (
    <main>
      <NavigationBar />
        <div className={styles.flex}>
          {/* <SideBar items={['Activities', 'Members', 'About']} handleClick={() => undefined}/> */}
          <Menu className={styles.sidebar} onClick={onMenuItemClick} defaultSelectedKeys={['0']} mode="inline">
            <Menu.Item key="0">Activities</Menu.Item>
            <Menu.Item key="1">Members</Menu.Item>
            <Menu.Item key="2">About</Menu.Item>
          </Menu>
          <div>
            <SceneHeader title='Activities' showBackButton={false} handleBackButtonClick={() => undefined} />
            <ActivitiesScene activities={activitiesDB} setSelectedActivity={setSelectedActivity} />
          </div>
        </div>
    </main>
  )

  function handleBackButtonClick (): void {
    setSelectedActivity(nullActivity)
  }

  function onMenuItemClick (item: any): void {
    console.log('click ', item)
  }
}

// const onClick = (e: string) => {
//   console.log('click ', e);
// };

// }
// const items = ['Activities', 'Members', 'About']
