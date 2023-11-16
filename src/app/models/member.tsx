'use client';

import { v4 as uuidv4 } from 'uuid';

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