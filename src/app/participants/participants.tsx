'use client'
import { React, useState } from 'react'
import styles from './participants.module.css'
import { Participant } from '../models/activity'
import type { Activity } from '../models/activity'
import { Member, PersonName } from '../models/member'
import { Modal, Table, Button } from 'antd'
import CheckinScene from '../checkin/checkin'

// function ParticipantItem ({ participant, onSelect }: { participant: Participant, onSelect: (participant: Participant) => void }): JSX.Element {
//   function className (): string {
//     if (participant.actions.length === 0) {
//       return ' '
//     }

//     const lastAction = participant.actions[participant.actions.length - 1]
//     switch (lastAction.actionType) {
//       case ActionType.CHECKIN:
//         return 'participant-checked-in'
//       case ActionType.CHECKOUT:
//         return 'participant-checked-out'
//       default:
//         return ' '
//     }
//   }

//   function onClick (): void {
//     onSelect(participant)
//   }

//   return (
//     <li className={styles[className()]} key={participant.member.id} onClick={onClick}>
//       {participant.member.fullName()}
//     </li>
//   )
// }

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
        open={selected.member.fullName() !== '  '}
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
      key: 'name'
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => (
          <Button
            onClick={
              () => {
                onSelectParticipant(record.participant)
                return false
              }
            }
            >
              {record.participant.status()}
            </Button>
      )
    }
  ]

  const items = activity.participants.map(function (p) {
    return {
      participant: p,
      name: p.member.fullName(),
      id: p.member.id
      // participant={p} onSelect={onSelectParticipant} />
    }
  })

  return (
    <div className={styles['participants-content']}>
      {/* <p>{activity.participants.length} participants</p> */}
      <Table columns={columns} dataSource={items} />
      {checkinScene()}
    </div>
  )
}
