'use client'
import { React, useState } from 'react'
import styles from './participants.module.css'
import { Participant } from '../models/activity'
import type { Activity } from '../models/activity'
import { Member, PersonName } from '../models/member'
import { Modal, Table, Button } from 'antd'
import CheckinScene from '../checkin/checkin'

export function ParticipantsScene ({ activity }: { activity: Activity }): JSX.Element {
  if (activity.participants.length === 0) {
    return (
      <div>
        <p>No participants registered.</p>
      </div>
    )
  }

  const nullParticipant = new Participant(new Member(0, new PersonName('', '', '')))
  const [selected, setSelected] = useState(nullParticipant)

  function onSelectParticipant (participant: Participant): void {
    setSelected(participant)
  }

  function checkinScene (): JSX.Element {
    const onClose = function (): void { setSelected(nullParticipant) }
    const children = <CheckinScene participant={selected} onCheck={onClose} />
    return <>
      <Modal
        title={selected.member.fullName()}
        open={selected.member.id !== nullParticipant.member.id}
        onCancel={onClose}
        footer={[]}
      >
          {children}
      </Modal>
    </>
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: { compare: (a, b) => a.name.localeCompare(b.name) },
      defaultSortOrder: 'ascend',
      sortDirections: ['ascend', 'descend', 'ascend']
    },
    {
      title: 'Check in Time',
      dataIndex: 'checkInTime',
      key: 'checkInTime',
      // sorter: { compare: (a, b) => a.checkInTime.localeCompare(b.checkInTime) }
    },
    {
      title: 'Check out Time',
      dataIndex: 'checkOutTime',
      key: 'checkOutTime',
      // sorter: { compare: (a, b) => a.checkOutTime.localeCompare(b.checkOutTime) }
    }
  ]

  const items = activity.participants
    .map(function (p) {
      return {
        participant: p,
        name: p.member.fullName(),
        checkInTime: p.checkInDate?.toLocaleTimeString(),
        checkOutTime: p.checkOutDate?.toLocaleTimeString()
      }
    })
    .sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div className={styles['participants-content']}>
      {/* <p>{activity.participants.length} participants</p> */}
      <Table
        size='small'
        columns={columns}
        dataSource={items}
        onRow={(record, rowIndex) => {
          return {
            className: 'participants-row',
            onClick: event => { onSelectParticipant(record.participant) }
          }
        }}
      />
      {checkinScene()}
    </div>
  )
}
