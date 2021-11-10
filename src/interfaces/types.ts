export type GroupType = {
    id: string,
    authorId: string,
    name: string,
    description: string,
    city: string,
    members: string[]
}

export type FirebaseGroupsType = Record<string, {
    authorId: string,
    name: string,
    description: string,
    city: string,
    members: string[]
}>

export type UserType = {
    groups?: string[],
    events?: string[]
}

export type FirebaseUserType = Record<string, {
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