'use client';
import { Activity, Participant } from '../models/activity';
import styles from './checkin.module.css'

enum ParticipantActionType { CheckIn, CheckOut }

class ParticipantAction {
    type: ParticipantActionType;
    dateTime: Date;
    activity: Activity;

    constructor(type: ParticipantActionType, dateTime: Date, activity: Activity) {
        this.type = type;
        this.dateTime = dateTime;
        this.activity = activity;
    }
}

export default function CheckinScene({ participant, onCheck }: { participant: Participant , onCheck: () => void}) {
    if (participant.isCheckedIn() == true) {
      const onClickCheckOut = () => {
        participant.checkOut();
        onCheck();
      };
      return (
        <div className={styles["checkin-scene"]}>
            <div className={styles["check-container"]}>
            <button className={styles["checkout-bt"]} onClick={() => onClickCheckOut()}>Check Out</button>
            </div>
        </div>
      )
    } else {
      const onClickCheckIn = () => {
        participant.checkIn();
        onCheck();
      };
      return (
        <div className={styles["checkin-scene"]}>
            <div className={styles["check-container"]}>
            <button className={styles["checkin-bt"]} onClick={() => onClickCheckIn()}>Check In</button>
            </div>
        </div>
      )
    }
}