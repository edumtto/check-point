'use client';
import { Activity } from '../activities/activities';
import { Participant } from '../participants/participants';
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

export default function CheckinScene({ participant }: { participant: Participant }) {
    return (
        <div className={styles["checkin-scene"]}>
                <div className={styles["check-container"]}>
                <button className={styles["checkin-bt"]}>Check In</button>
                <button className={styles["checkout-bt"]}>Check Out</button>
                </div>
                
        </div>
    )
}