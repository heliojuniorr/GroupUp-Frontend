export type GroupType = {
    id: string,
    name: string,
    description: string,
    city: string
}

export type FirebaseGroupsType = Record<string, {
    name: string,
    description: string,
    city: string
}>