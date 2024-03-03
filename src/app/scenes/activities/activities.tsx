'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { type Activity } from '../../globals/models/activity'
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

  const timelineItems = activities.map((val, index) =>
    <List.Item key={val.id}>
      <Space>
        <p>{val.startDateTime.getHours() + ':' + val.startDateTime.getMinutes()}</p>
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
    router.push('/scenes/participants/' + activity.id)
  }
}
