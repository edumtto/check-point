'use client';

import styles from './participants.module.css'
import { Activity } from '../activities/activities';
import { v4 as uuidv4 } from 'uuid';

export class Participant {
    id: uuidv4;
    name: string;

    constructor(id: uuidv4, name: string) {
        this.id = id;
        this.name = name;
    }  
}

function ParticipantItem({ participant }:{ participant: Participant }) {
    return (
        <li key={participant.id} onClick={ () => alert(participant.name)}>
            {participant.name}
        </li>
    )
}

export function ParticipantsScene({ activity, participants}:{activity: Activity, participants: Array<Participant>}) {
    if (participants.length == 0) {
        return (
            <div>
                <p>No participants registered.</p>
            </div>
        )
    }

    let items = participants.map( (p) => <ParticipantItem participant={p} />)

    return (
        <div className={styles["participants-content"]}>
            <p>{participants.length} participants</p>
            <ul className={styles["participant-list"]}>
            {items}
            </ul>
            
        </div>
    )
}