export type GroupType = {
    id: string,
    authorId: string,
    name: string,
    description: string,
    city: string,
    members: string[],
    events?: string[]
}

export type FirebaseGroupsType = Record<string, {
    authorId: string,
    name: string,
    description: string,
    city: string,
    members: string[],
    events?: string[]
}>

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
    members: string[]
}

export type FirebaseEventType = Record<string, {
    name: string,
    description: string,
    city: string,
    groupId: string,
    members: string[]
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