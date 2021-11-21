import logoImg from '../assets/logo.svg'
import forestImg from '../assets/forest.svg'

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
    events?: string[]
}

export type FirebaseUserType = Record<string, {
    name?: string,
    groups?: string[]
    events?: string[]
}>

export type EventType = {
    id: string,
    name: string,
    description: string,
    city: string,
    groupId: string,
    members: string[],
    messages?: FirebaseMessageType
}

export type FirebaseEventType = Record<string, {
    name: string,
    description: string,
    city: string,
    groupId: string,
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

export const images = {
    default: logoImg,
    forest: forestImg
}