'use client';
import { Participant } from '../participants/participants';
import styles from './checkin.module.css'
import classNames from 'classnames';

export default function CheckinScene({ participant, onClose }: { participant: Participant, onClose: () => void }) {
    const contentClasses = classNames(styles["modal-content"], styles["animate-zoom"])
    return (
        <div className={styles["modal"]}>
            <div className={contentClasses}>
                <button className={styles["close-modal"]} onClick={onClose}>x</button>
                <h2>Name: {participant.fullName()}</h2>
                <button>Check In</button>
                <br />
                <button>Check Out</button>
            </div>
        </div>
    )
}