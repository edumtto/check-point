'use client';
import { Activity } from '../models/activity';
import styles from './activities.module.css'
import { Timeline, TimelineItemProps } from 'antd';

export enum ActionType {
  CHECKIN,
  CHECKOUT
}

export class ParticipantAction {
  actionType: ActionType;
  time: number; // Timestamp type
  
  constructor(actionType: ActionType, time: number) {
    this.actionType = actionType;
    this.time = time;
  }
}

function ActivityItem({ activity, setSelectedActivity }: { activity: Activity, setSelectedActivity: (value: Activity) => void }) {
  return (
    <li className={styles['activity-item']} key={activity.name}>
      <p className={styles['activity-time']}>{activity.dateTime.getHours()}:{activity.dateTime.getMinutes()}</p>
      <button className={styles['activity-content']} onClick={() => setSelectedActivity(activity)}>
        <h4>{activity.name}</h4>
        <p>{activity.description}</p>
      </button>
    </li>
  )
}

export function ActivitiesScene({ activities, setSelectedActivity }: { activities: Array<Activity>, setSelectedActivity: (value: Activity) => void }) {

  // const activityItems = activities.map((val, index) =>
  //   <ActivityItem activity={val} setSelectedActivity={setSelectedActivity} />
  // );


  const timelineItems = activities.map((val, index) =>
    <Timeline.Item 
      color="green" 
      // label={val.dateTime.getHours() + ":" + val.dateTime.getMinutes()} 
      children={
        <div>
          <p>{val.dateTime.getHours() + ":" + val.dateTime.getMinutes()}</p>
          <button className={styles['activity-content']} onClick={() => setSelectedActivity(val)}>
            <h4>{val.name}</h4>
            <p>{val.description}</p>
          </button>
        </div>
          
      } 
    />
  );

  return (
    <div className={styles.fullh}>
      <Timeline mode="left">
        {timelineItems}
      </Timeline>
    </div>
  );
}
