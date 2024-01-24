'use client'
import React from 'react'
import type { Participant } from '../models/activity'
import styles from './checkin.module.css'
import { Card, Button } from 'antd'

export default function CheckinScene (
  { participant, onCheck }: { participant: Participant, onCheck: () => void }
): React.JSX.Element {
  let checkButton: React.JSX.Element
  let lastCheck: React.JSX.Element = <></>

  if (participant.isCheckedOut()) {
    checkButton = <></>
  } else if (participant.isCheckedIn()) {
    checkButton = (
      <div className={styles['check-container']}>
        <button className={styles['checkout-bt']} onClick={onClickCheckOut}>Check Out</button>
      </div>
    )
  } else {
    checkButton = (
      <div className={styles['check-container']}>
        <button className={styles['checkin-bt']} onClick={onClickCheckIn}>Check In</button>
      </div>
    )
  }

  if (participant.lastAction() !== null) {
    lastCheck = (
      <Card size='small'>
        <div>
          <p>{'Last action: ' + participant.lastAction()?.description()}</p>
          <Button className={styles['float-right']} onClick={ onClickUndo }>Undo</Button>
        </div>
      </Card>
    )
  }

  return (<> {lastCheck} {checkButton} </>)

  function onClickUndo (): void {
    participant.undoLastAction()
    onCheck()
  }

  function onClickCheckOut (): void {
    participant.checkOut()
    onCheck()
  }

  function onClickCheckIn (): void {
    participant.checkIn()
    onCheck()
  }
}
