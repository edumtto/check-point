'use client'
import { React, useState } from 'react'
import styles from './participants.module.css'
import { Participant, ActionType } from '../models/activity'
import type { Activity } from '../models/activity'
import { Member, PersonName } from '../models/member'
import { ModalBox } from '../global-components/global-components'
import CheckinScene from '../checkin/checkin'

function ParticipantItem ({ participant, onSelect }: { participant: Participant, onSelect: (participant: Participant) => void }): JSX.Element {
  function className (): string {
    if (participant.actions.length === 0) {
      return ' '
    }

    const lastAction = participant.actions[participant.actions.length - 1]
    switch (lastAction.actionType) {
      case ActionType.CHECKIN:
        return 'participant-checked-in'
      case ActionType.CHECKOUT:
        return 'participant-checked-out'
      default:
        return ' '
    }
  }

  function onClick (): void {
    onSelect(participant)
  }

  return (
    <li className={styles[className()]} key={participant.member.id} onClick={onClick}>
      {participant.member.fullName()}
    </li>
  )
}

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
    if (selected.member.fullName() !== '  ') {
      const onClose = function (): void { setSelected(nullParticipant) }
      const children = <CheckinScene participant={selected} onCheck={onClose} />
      return <ModalBox title={selected.member.fullName()} hidden={false} onClose={onClose}>
        {children}</ModalBox>
    }
    return <></>
  }

  const items = activity.participants.map(
    (p) => <ParticipantItem key={p.member.id} participant={p} onSelect={onSelectParticipant} />
  )

  return (
    <div className={styles['participants-content']}>
      <p>{activity.participants.length} participants</p>
      <ul className={styles['participant-list']}>
        {items}
      </ul>
      {checkinScene()}
    </div>
  )
}
