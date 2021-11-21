import { FirebaseEventType, FirebaseGroupsType, FirebaseUserType, GroupListType, GroupType, UserType } from "../interfaces/types"
import { database, firebaseChild, firebaseGet, firebasePush, firebaseRef, firebaseUpdate } from "../services/firebase"
import { useAuth } from "./useAuth"

export function useEvent() {
    const { user } = useAuth()
    const userChild = firebaseChild(firebaseRef(database), `users/${user?.id}`)
    const eventChild = (eventId?: string) => firebaseChild(firebaseRef(database), `events/${eventId ?? ""}`)
    const groupChild = (groupId?: string) => firebaseChild(firebaseRef(database), `groups/${groupId ?? ""}`)
    const updateFirebase = (updates: any) => firebaseUpdate(firebaseRef(database), updates) 

    function createEvent(name: string, description: string, group: GroupListType) {
        const newEventKey = firebasePush(eventChild()).key

        firebaseGet(groupChild(group.id)).then((snapshot) => {
            if(snapshot.exists()) {
                const parsedGroup: GroupType = snapshot.val()

                let groupUpdates: FirebaseGroupsType = {}
                if(newEventKey !== '' && newEventKey !== null) {
                    if(group?.id) {
                        groupUpdates[`/groups/${group.id}`] = {
                            ...parsedGroup,
                            events: parsedGroup?.events ? [...parsedGroup.events, newEventKey] : [newEventKey]
                        };
                        updateFirebase(groupUpdates)
                    }

                    let eventUpdates: FirebaseEventType = {}
                    if(user?.id) {
                        eventUpdates[`/events/${newEventKey}`] = {
                            name,
                            description,
                            city: parsedGroup.city,
                            groupId : group.id,
                            members: [user.id]
                        };
                        updateFirebase(eventUpdates)
                    }
                }
                addEventToUsers(newEventKey || '')
            }
            else {
                console.error("No data available!")
            }
        }).catch(error => console.error(error))
    }

    function addEventToUsers(eventKey: string) {
        firebaseGet(userChild).then((snapshot) => {
            if(snapshot.exists()) {
                const parsedUser: UserType = snapshot.val()

                let updates: FirebaseUserType = {}
                if(eventKey !== '') {
                    if(user?.id) {
                        updates[`/users/${user.id}`] = {
                            ...parsedUser,
                            name: user.name,
                            events: parsedUser?.events ? [...parsedUser.events, eventKey] : [eventKey]
                        };
                        updateFirebase(updates)
                    }
                }
            }
            else {
                console.error("No data available!")
            }
        }).catch(error => console.error(error))
    }

    return { createEvent, addEventToUsers }
}