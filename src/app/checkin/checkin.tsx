'use client'
import React from 'react'
import type { Participant } from '../models/activity'
import styles from './checkin.module.css'

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
  if (participant.isCheckedIn()) {
    const onClickCheckOut = (): void => {
      participant.checkOut()
      onCheck()
    }
    return (
      <>
        <div className={styles['check-container']}>
          <button className={styles['checkout-bt']} onClick={() => onClickCheckOut()}>Check Out</button>
        </div>
      </>
    )
  } else {
    const onClickCheckIn = (): void => {
      participant.checkIn()
      onCheck()
    }
    return (
      <>
        <div className={styles['check-container']}>
          <button className={styles['checkin-bt']} onClick={() => onClickCheckIn()}>Check In</button>
        </div>
      </>
    )
  }
}
