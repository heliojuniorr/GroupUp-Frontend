import logoImg from '../assets/logo.svg'
import forestImg from '../assets/forest.svg'
import basketBallImg from '../assets/basketball.svg'
import tentImg from '../assets/tent.svg'
import backpackImg from '../assets/backpack.svg'
import mapImg from '../assets/map.svg'
import soccerImg from '../assets/soccer.svg'

import defaultPerson from '../assets/defaultperson.svg'
import person1 from '../assets/person1.svg'
import person2 from '../assets/person2.svg'
import person3 from '../assets/person3.svg'
import person4 from '../assets/person4.svg'
import person5 from '../assets/person5.svg'
import person6 from '../assets/person6.svg'
import person7 from '../assets/person7.svg'
import person8 from '../assets/person8.svg'
import person9 from '../assets/person9.svg'

export type TextFieldType = {
    value: string,
    error: boolean
}

export type GroupType = {
    id: string,
    authorId: string,
    name: string,
    description: string,
    city: string,
    members: string[],
    image: string,
    events?: string[],
    messages?: FirebaseMessageType
}

export type FirebaseGroupsType = Record<string, {
    authorId: string,
    name: string,
    description: string,
    city: string,
    members: string[],
    image: string,
    events?: string[],
    messages?: FirebaseMessageType
}>

export type GroupListType = {
    id: string,
    name: string
}

export type UserType = {
    id?: string,
    name?: string,
    groups?: string[],
    events?: string[],
    image?: string
}

export type FirebaseUserType = Record<string, {
    name?: string,
    groups?: string[],
    events?: string[],
    image?: string
}>

export type EventType = {
    id: string,
    name: string,
    description: string,
    city: string,
    groupId: string,
    image: string,
    members: string[],
    messages?: FirebaseMessageType
}

export type FirebaseEventType = Record<string, {
    name: string,
    description: string,
    city: string,
    groupId: string,
    image: string,
    members: string[],
    messages?: FirebaseMessageType
}>

export type ParamsType = {
    id: string
}

export type GroupCardParams = {
    group: GroupType,
    disabled?: boolean
}

export type EventCardParams = {
    event: EventType,
    disabled?: boolean
}

export type MembersCardParams = {
    members: UserType[]
}

export type FirebaseMessageType = Record<string, {
    content: string,
    authorName: string,
}>

export type MessageType = {
    content: string,
    authorName: string,
}

export type MessageParams = {
    message: MessageType,
}

export const iconImages = {
    padrao: logoImg,
    floresta: forestImg,
    basquete: basketBallImg,
    acampamento: tentImg,
    trilha: mapImg,
    mochilao: backpackImg,
    futebol: soccerImg
}

export const profileImages = {
    padrao: defaultPerson,
    pessoa1: person1,
    pessoa2: person2,
    pessoa3: person3,
    pessoa4: person4,
    pessoa5: person5,
    pessoa6: person6,
    pessoa7: person7,
    pessoa8: person8,
    pessoa9: person9
}