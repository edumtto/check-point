'use client'
import React from 'react'
import type { Participant } from '../models/activity'
import styles from './checkin.module.css'
import { Card, Button } from 'antd'

// enum ParticipantActionType { CheckIn, CheckOut }

// class ParticipantAction {
//   type: ParticipantActionType
//   dateTime: Date
//   activity: Activity

//   constructor (type: ParticipantActionType, dateTime: Date, activity: Activity) {
//     this.type = type
//     this.dateTime = dateTime
//     this.activity = activity
//   }
// }

export default function CheckinScene (
  { participant, onCheck }: { participant: Participant, onCheck: () => void }
): React.JSX.Element {
  let checkButton: React.JSX.Element
  let lastCheck: React.JSX.Element = <></>

  if (participant.isCheckedIn()) {
    checkButton = (
        <button className={styles['checkout-bt']} onClick={onClickCheckOut}>Check Out</button>
    )
  } else {
    checkButton = (
        <button className={styles['checkin-bt']} onClick={onClickCheckIn}>Check In</button>
    )
  }

  if (participant.lastAction() !== null) {
    const actionName = participant.isCheckedIn() ? 'Check in' : 'Checkout'
    const actionTime = participant.lastAction()?.dateTime.toDateString()
    lastCheck = (
      <Card size='small'>
        <div>
          <p>{'Last action: ' + actionName + ' at ' + actionTime}</p>
          <Button className={styles['float-right']}>Undo</Button>
        </div>
      </Card>
    )
  }

  return (
    <>
      {lastCheck}
      <div className={styles['check-container']}>
        {checkButton}
      </div>
    </>
  )

  function onClickCheckOut (): void {
    participant.checkOut()
    onCheck()
  }

  function onClickCheckIn (): void {
    participant.checkIn()
    onCheck()
  }
}
