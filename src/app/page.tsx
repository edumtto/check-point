'use client'
import { React, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Activity, Participant } from './models/activity'
import { Member, PersonName } from './models/member'
import { ActivitiesScene } from './activities/activities'
import { ParticipantsScene } from './participants/participants'
import { MembersScene } from './members/members'
import { NavigationBar, SceneHeader } from './global-components/global-components'
import { Menu, Layout } from 'antd'
const { Header, Sider } = Layout
import styles from './page.module.css'
// import { RightCircleFilled } from '@ant-design/icons'

const membersDB = [
  new Member(uuidv4(), new PersonName('Antonio', '', 'Gomez')),
  new Member(uuidv4(), new PersonName('Carlos', '', 'Rodriguez')),
  new Member(uuidv4(), new PersonName('Barbara', '', 'Smith')),
  new Member(uuidv4(), new PersonName('Daniel', '', 'Rodrigo')),
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
  new Activity('Chair-a-cise and a long name for the type of activity so we know if the page is rending it correctly', 'Exercises in a chair.', new Date(2023, 10, 18, 11, 15, 0, 0), 60, chairACiseParticipants),
  new Activity('Zumba', 'Latin music dance class.', new Date(2023, 10, 17, 14, 15, 0, 0), 60, zumbaParticipants),
  new Activity('Chair-a-cise', 'bla bla bla', new Date(2023, 10, 18, 11, 15, 0, 0), 60, chairACiseParticipants),
  new Activity('Zumba', 'Latin music dance class.', new Date(2023, 10, 17, 14, 15, 0, 0), 60, zumbaParticipants),
  new Activity('Chair-a-cise', 'bla bla bla', new Date(2023, 10, 18, 11, 15, 0, 0), 60, chairACiseParticipants),
  new Activity('Zumba', 'Latin music dance class.', new Date(2023, 10, 17, 14, 15, 0, 0), 60, zumbaParticipants),
  new Activity('Chair-a-cise', 'bla bla bla', new Date(2023, 10, 18, 11, 15, 0, 0), 60, chairACiseParticipants),
  new Activity('Zumba', 'Latin music dance class.', new Date(2023, 10, 17, 14, 15, 0, 0), 60, zumbaParticipants),
  new Activity('Chair-a-cise', 'bla bla bla', new Date(2023, 10, 18, 11, 15, 0, 0), 60, chairACiseParticipants),
  new Activity('Zumba', 'Latin music dance class.', new Date(2023, 10, 17, 14, 15, 0, 0), 60, zumbaParticipants),
  new Activity('Chair-a-cise', 'bla bla bla', new Date(2023, 10, 18, 11, 15, 0, 0), 60, chairACiseParticipants)
]

export default function Home (): JSX.Element {
  const nullActivity = new Activity('', '', new Date(), 0, [])
  const [selectedActivity, setSelectedActivity] = useState(nullActivity)
  const [selectedMenuItem, setSelectedMenuItem] = useState('0')

  if (selectedActivity.name !== '') {
    return (
      <main>
        <NavigationBar />
        <Layout className={styles.content}>
          <SceneHeader title={selectedActivity.name} showBackButton={true} handleBackButtonClick={handleBackButtonClick} />
          <ParticipantsScene activity={selectedActivity} />
        </Layout>
      </main>
    )
  }

  const menuItems: any[] = [
    {
      key: 'g0',
      label: 'Check In',
      type: 'group',
      children: [
        { key: '0', label: 'Activities' },
        { key: '1', label: 'Members' }
      ]
    },
    {
      key: 'g1',
      label: 'Manage',
      type: 'group',
      children: [
        { key: '2', label: 'Activities' },
        { key: '3', label: 'Members' }
      ]
    },
    {
      key: 'g2',
      label: 'About',
      type: 'group',
      children: [
        { key: '4', label: 'FAQ' },
        { key: '5', label: 'Support' }
      ]
    }
  ]

  let mainScene: React.JSX.Element
  if (selectedMenuItem === '0') {
    mainScene = <ActivitiesScene activities={activitiesDB} setSelectedActivity={setSelectedActivity}/>
  } else {
    mainScene = <MembersScene members={membersDB} />
  }

  return (
    <main className={styles.main}>
      <NavigationBar />
      {/* <Header>AAA</Header> */}
        <Layout className={styles.content}>
          <Sider className={styles['side-menu']}>
          <Menu className={styles['side-menu-content']} onClick={onMenuItemClick} defaultSelectedKeys={['0']} mode="inline" items={menuItems}/>
          </Sider>
          <div>
            <SceneHeader title='Activities' showBackButton={false} handleBackButtonClick={() => undefined} />
            <div className={styles['main-scene']}>
             {mainScene}
            </div>
          </div>
        </Layout>
    </main>
  )

  function handleBackButtonClick (): void {
    setSelectedActivity(nullActivity)
  }

  function onMenuItemClick (item: any): void {
    // console.log('click ', item.key)
    setSelectedMenuItem(item.key)
  }
}
