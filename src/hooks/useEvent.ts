import { FirebaseEventType, FirebaseGroupsType, FirebaseMessageType, FirebaseUserType, GroupListType, GroupType, MessageType, UserType } from "../interfaces/types"
import { database, firebaseChild, firebaseGet, firebasePush, firebaseRef, firebaseUpdate } from "../services/firebase"
import { useAuth } from "./useAuth"

export function useEvent() {
    const { user } = useAuth()
    const userChild = firebaseChild(firebaseRef(database), `users/${user?.id}`)
    const eventChild = (eventId?: string) => firebaseChild(firebaseRef(database), `events/${eventId ?? ""}`)
    const groupChild = (groupId?: string) => firebaseChild(firebaseRef(database), `groups/${groupId ?? ""}`)
    const updateFirebase = (updates: any) => firebaseUpdate(firebaseRef(database), updates) 

    function createEvent(name: string, description: string, group: GroupListType, image: string) {
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
                            image,
                            members: [user.id]
                        };
                        updateFirebase(eventUpdates)
                    }
                }
                addEventToUser(newEventKey || '')
            }
            else {
                console.error("No data available!")
            }
        }).catch(error => console.error(error))
    }

    function addEventToUser(eventKey: string) {
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

    function removeEventFromUser(eventKey: string) {        
        let updates: FirebaseUserType = {}

        firebaseGet(userChild).then((snapshot) => {
            if(snapshot.exists()) {
                const parsedUser: UserType = snapshot.val()
                
                if(eventKey !== '' && user?.id) {
                    parsedUser?.events && parsedUser.events.splice(parsedUser.events.indexOf(eventKey), 1)
                    updates['/users/' + user.id] = {
                        ...parsedUser,
                        name: user.name,
                        events: parsedUser?.events ? [...parsedUser.events] : []
                    };
                    updateFirebase(updates)
                }
            }
            else {
                console.error("No data available!")
            }
        }).catch(error => console.error(error))
    }

    function sendMessageToEvent(message: MessageType, eventId: string) {
        const messagesChild = firebaseChild(firebaseRef(database), `events/${eventId}/messages/`)
            const newMessageId = firebasePush(messagesChild).key

            let updates: FirebaseMessageType = {}
            if(user?.name) {
                updates[`events/${eventId}/messages/${newMessageId}`] = {
                    ...message
                };
                updateFirebase(updates)
            }
    }

    function addUserToEvent(eventKey: string) {        
        let updates: FirebaseGroupsType = {}

        firebaseGet(eventChild(eventKey)).then((snapshot) => {
            if(snapshot.exists()) {
                const parsedGroup: GroupType = snapshot.val()
                
                if(eventKey !== '' && user?.id) {
                    updates['/events/' + eventKey] = {
                        ...parsedGroup,
                        members: parsedGroup?.members ? [...parsedGroup.members, user.id] : [user.id]
                    };
                    updateFirebase(updates)
                }
            }
            else {
                console.error("No data available!")
            }
        }).catch(error => console.error(error))
    }

    function removeUserFromEvent(eventKey: string) {        
        let updates: FirebaseGroupsType = {}

        firebaseGet(eventChild(eventKey)).then((snapshot) => {
            if(snapshot.exists()) {
                const parsedGroup: GroupType = snapshot.val()
                
                if(eventKey !== '' && user?.id) {
                    parsedGroup?.members && parsedGroup.members.splice(parsedGroup.members.indexOf(user.id), 1)
                    updates['/events/' + eventKey] = {
                        ...parsedGroup,
                        members: parsedGroup?.members ? [...parsedGroup.members] : []
                    };
                    updateFirebase(updates)
                }
            }
            else {
                console.error("No data available!")
            }
        }).catch(error => console.error(error))
    }

    return { 
        createEvent, 
        addEventToUser, 
        removeEventFromUser,
        addUserToEvent,
        removeUserFromEvent,
        sendMessageToEvent 
    }
}