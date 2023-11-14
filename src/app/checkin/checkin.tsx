'use client';
import { Activity, Participant } from '../activities/activities';
import { Member } from '../participants/participants';
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
    const onClickCheckIn = () => {
        participant.checkIn();
        onCheck();
    };

    const onClickCheckOut = () => {
        participant.checkOut();
        onCheck();
    };

    return (
        <div className={styles["checkin-scene"]}>
            <div className={styles["check-container"]}>
            <button className={styles["checkin-bt"]} onClick={() => onClickCheckIn()}>Check In</button>
            <button className={styles["checkout-bt"]} onClick={() => onClickCheckOut()}>Check Out</button>
            </div>
        </div>
    )
}