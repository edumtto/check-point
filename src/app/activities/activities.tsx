'use client'
import React from 'react'
import type { Activity } from '../models/activity'
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
  { activities, setSelectedActivity }: { activities: Activity[], setSelectedActivity: (value: Activity) => void }
): React.JSX.Element {
  // const activityItems = activities.map((val, index) =>
  //   <ActivityItem activity={val} setSelectedActivity={setSelectedActivity} />
  // );
  const timelineItems = activities.map((val, index) =>
    <List.Item
      key={val.id}
    >
      <Space>
        <p>{val.dateTime.getHours() + ':' + val.dateTime.getMinutes()}</p>
        <Card size='small' className={styles['activity-content']} onClick={() => setSelectedActivity(val)}>
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
}
