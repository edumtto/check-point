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

export function ParticipantsScene({ activity, participants}:{activity: Activity, participants: Array<Participant>}) {
    if (participants.length == 0) {
        return (
            <div>
            <p>No participants registered.</p>
        </div>
        )
    }
    return (
        <div>
            <p>{participants.length} participants</p>
            <ul>
            {participants.map( (p) => <li key={p.id}>{p.id} - {p.name}</li>)}
            </ul>
            
        </div>
    )
}