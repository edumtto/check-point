'use client';
import { Participant } from '../participants/participants';
import styles from './checkin.module.css'


export default function CheckinScene({ participant }: { participant: Participant }) {
    return (
        <div>
                <h2>Name: {participant.fullName()}</h2>
                <button>Check In</button>
                <br />
                <button>Check Out</button>
        </div>
    )
}