'use client';

import styles from './participants.module.css'
import { Activity, Participant, ActionType } from '../activities/activities';
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

export class Member {
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
    const className = () => {
        if (participant.actions.length == 0) {
            return " "
        }

        const lastAction = participant.actions[participant.actions.length - 1];
        switch(lastAction.actionType) {
            case ActionType.CHECKIN: 
                return "participant-checked-in"
            case ActionType.CHECKOUT:
                return "participant-checked-out"
            default:
                return " "
        }
    };

    return (
        <li className={styles[className()]} key={participant.member.id} onClick={() => onSelect(participant)}>
            {participant.member.fullName()}
        </li>
    )
}

export function ParticipantsScene({ activity }: { activity: Activity }) {
    console.log(activity);
    if (activity.participants.length == 0) {
        return (
            <div>
                <p>No participants registered.</p>
            </div>
        )
    }

    const nullParticipant = new Participant(new Member(0, new PersonName("", "", "")));
    const [selected, setSelected] = useState(nullParticipant);
    const onSelectParticipant = (participant: Participant) => {
        setSelected(participant);
    };

    const checkinScene = () => {
        if (selected.member.fullName() != "  ") {
            const children = <CheckinScene participant={selected} onCheck={ () => setSelected(nullParticipant)}/> 
            return <ModalBox title={selected.member.fullName()} children={children} hidden={false} onClose={ () => setSelected(nullParticipant)} />
        }
        return <></>
    }

    let items = activity.participants.map((p) => <ParticipantItem participant={p} onSelect={onSelectParticipant} />)

    return (
        <div className={styles["participants-content"]}>
            <p>{activity.participants.length} participants</p>
            <ul className={styles["participant-list"]}>
                {items}
            </ul>
            {checkinScene()}
        </div>
    )
}