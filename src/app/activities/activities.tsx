'use client'
import React from 'react'
import type { Activity } from '../models/activity'
import styles from './activities.module.css'
import { Timeline, Card } from 'antd'

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

// function ActivityItem (
//   { activity, setSelectedActivity }: { activity: Activity, setSelectedActivity: (value: Activity) => void }
// ): React.JSX.Element {
//   return (
//     <li className={styles['activity-item']} key={activity.name}>
//       <p className={styles['activity-time']}>{activity.dateTime.getHours()}:{activity.dateTime.getMinutes()}</p>
//       <button className={styles['activity-content']} onClick={() => setSelectedActivity(activity)}>
//         <h4>{activity.name}</h4>
//         <p>{activity.description}</p>
//       </button>
//     </li>
//   )
// }

export function ActivitiesScene (
  { activities, setSelectedActivity }: { activities: Activity[], setSelectedActivity: (value: Activity) => void }
): React.JSX.Element {
  // const activityItems = activities.map((val, index) =>
  //   <ActivityItem activity={val} setSelectedActivity={setSelectedActivity} />
  // );
  const timelineItems = activities.map((val, index) =>
    <Timeline.Item
      color="green"
      key={val.dateTime.getHours() + ':' + val.dateTime.getMinutes()}
    >
      <div>
        <Card size='small' className={styles['activity-content']} onClick={() => setSelectedActivity(val)}>
        <h3>{val.name}</h3>
        <p>{val.dateTime.getHours() + ':' + val.dateTime.getMinutes() + ' | Natomas room | 23 registered'}</p>
        </Card>
      </div>
    </Timeline.Item>
  )

  return (
    <Timeline mode="left">
      {timelineItems}
    </Timeline>
  )
}
