'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'
import { Activity } from '../../globals/models/activity'
import styles from './activities.module.css'
import { List, Card, Space } from 'antd'

export enum ActionType {
  CHECKIN,
  CHECKOUT
}

export class ParticipantAction {
  actionType: ActionType
  time: number // Timestamp type

  constructor (actionType: ActionType, time: number) {
    this.actionType = actionType
    this.time = time
  }
}

export function ActivitiesScene (
  { activities }: { activities: Activity[] }
): React.JSX.Element {
  const router = useRouter()
  
  // if (selectedActivity.name !== '') {
  //   // return (
  //   //   <main>
  //   //     <NavigationBar />
  //   //     <Layout className={styles.content}>
  //   //       <SceneHeader title={selectedActivity.name} showBackButton={true} handleBackButtonClick={handleBackButtonClick} />
  //   //       <ParticipantsScene activity={selectedActivity} />
  //   //     </Layout>
  //   //   </main>
  //   // )
    
  //   return </>
  // }
  // const activityItems = activities.map((val, index) =>
  //   <ActivityItem activity={val} setSelectedActivity={setSelectedActivity} />
  // );
  const timelineItems = activities.map((val, index) =>
    <List.Item key={val.id}>
      <Space>
        <p>{val.dateTime.getHours() + ':' + val.dateTime.getMinutes()}</p>
        <Card size='small' className={styles['activity-content']} onClick={() => { handleSelectActivity(val) }}>
        <Space>
        <h3>{val.name}</h3>
        <p>{'Natomas room | 23 registered'}</p>
        </Space>
        </Card>
      </Space>
    </List.Item>
  )

  return (
    <List split={false}>
        {timelineItems}
    </List>
  )

  function handleSelectActivity (activity: Activity): void {
    router.push('/scenes/members/add')
  }

  // function handleBackButtonClick (): void {
  //   setSelectedActivity(nullActivity)
  // }
}
