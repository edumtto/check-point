'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { type Activity } from '../../globals/models/activity'
import styles from './activities.module.css'
import { Table } from 'antd'

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

  const tableColumns = [
    {
      title: 'Time',
      dataIndex: 'time'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      render: (name: string) => (
        <span style={{ fontWeight: '700' }}>{name}</span>
      )
    },
    {
      title: 'Room',
      dataIndex: 'room'
    },
    {
      title: 'Enrolled',
      dataIndex: 'participants'
    }
  ]

  const tableData = activities
    .map(function (val, index) {
      return {
        key: val.id,
        time: val.startTime() + ' - ' + val.endTime(),
        name: val.name,
        room: val.room.name,
        participants: val.participants.length
      }
    })
    .sort((a, b) => a.time.localeCompare(b.time))

  return (
    <Table
      className={styles.activities__list}
      columns={tableColumns}
      dataSource={tableData}
      size='middle'
      bordered={false}
      pagination={{ pageSize: 50, position: [] }}
      onRow={(record, rowIndex) => {
        return {
          onClick: event => { handleSelectActivity(record.key) }
        }
      }}
    />
  )

  function handleSelectActivity (activityId: string): void {
    router.push('/scenes/participants/' + activityId)
  }
}
