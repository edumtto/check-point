'use client';

import styles from './participants.module.css'
import { Activity } from '../activities/activities';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { FrameCard, ModalBox } from '../global-components/global-components';
import CheckinScene from '../checkin/checkin';

export class PersonName {
    firstName: string;
    middleName: string;
    lastName: string;

    constructor(firstName: string, middleName: string, lastName: string) {
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
    }

    fullName() {
        return this.firstName + " " + this.middleName + " " + this.lastName;
    }
}

export class Participant {
    id: uuidv4;
    name: PersonName;

    constructor(id: uuidv4, name: PersonName) {
        this.id = id;
        this.name = name;
    }

    fullName() {
        return this.name.fullName();
    }
}

function ParticipantItem({ participant, onSelect }: { participant: Participant, onSelect: (participant: Participant) => void }) {
    return (
        <li key={participant.id} onClick={() => onSelect(participant)}>
            {participant.fullName()}
        </li>
    )
}

export function ParticipantsScene({ activity, participants }: { activity: Activity, participants: Array<Participant> }) {
    if (participants.length == 0) {
        return (
            <div>
                <p>No participants registered.</p>
            </div>
        )
    }

    const nullParticipant = new Participant(0, new PersonName("", "", ""));
    const [selected, setSelected] = useState(nullParticipant);
    const onSelectParticipant = (participant: Participant) => {
        setSelected(participant);
    };

    const checkinScene = () => {
        if (selected.fullName() != "  ") {
            const children = <CheckinScene participant={selected} /> 
            return <ModalBox title={selected.fullName()} children={children} hidden={false} onClose={ () => setSelected(nullParticipant)} />
        }
        return <></>
    }

    let items = participants.map((p) => <ParticipantItem participant={p} onSelect={onSelectParticipant} />)

    return (
        <div className={styles["participants-content"]}>
            <p>{participants.length} participants</p>
            <ul className={styles["participant-list"]}>
                {items}
            </ul>
            {checkinScene()}
        </div>
    )
}