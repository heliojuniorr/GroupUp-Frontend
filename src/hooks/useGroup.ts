import { FirebaseGroupsType, FirebaseMessageType, FirebaseUserType, GroupType, MessageType, UserType } from "../interfaces/types";
import { firebaseChild, firebaseRef, database, firebaseGet, firebaseUpdate, firebasePush } from "../services/firebase";
import { useAuth } from "./useAuth";

export function useGroup() {
    const { user } = useAuth()
    const userChild = firebaseChild(firebaseRef(database), `users/${user?.id}`)
    const groupChild = (groupId?: string) => firebaseChild(firebaseRef(database), `groups/${groupId ?? ""}`)
    const updateFirebase = (updates: any) => firebaseUpdate(firebaseRef(database), updates) 

    function createGroup(name: string, description: string, city: string, image: string, ageGroup: number) {
        const newGroupKey = firebasePush(groupChild()).key

        let updates: FirebaseGroupsType = {}
        if(user?.id) {
            updates[`/groups/${newGroupKey}`] = {
                authorId: user.id,
                name,
                description,
                city,
                members: [user.id],
                image,
                ageGroup
            };
            updateFirebase(updates)
            addGroupToUser(newGroupKey || '')
        }
    }
      
    function addGroupToUser(groupKey: string) {        
        let updates: FirebaseUserType = {}

        firebaseGet(userChild).then((snapshot) => {
            if(snapshot.exists()) {
                const parsedUser: UserType = snapshot.val()
                
                if(groupKey !== '' && user?.id) {
                    updates['/users/' + user.id] = {
                        ...parsedUser,
                        name: user.name,
                        groups: parsedUser?.groups ? [...parsedUser.groups, groupKey] : [groupKey]
                    };
                    updateFirebase(updates)
                }
            }
            else if(groupKey !== '' && user?.id){
                updates['/users/' + user.id] = {
                    name: user.name,
                    groups: [groupKey]
                };
                updateFirebase(updates)
            }
        }).catch(error => console.error(error))
    }

    function addUserToGroup(groupKey: string) {        
        let updates: FirebaseGroupsType = {}

        firebaseGet(groupChild(groupKey)).then((snapshot) => {
            if(snapshot.exists()) {
                const parsedGroup: GroupType = snapshot.val()
                
                if(groupKey !== '' && user?.id) {
                    updates['/groups/' + groupKey] = {
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

    function removeGroupFromUser(groupKey: string) {        
        let updates: FirebaseUserType = {}

        firebaseGet(userChild).then((snapshot) => {
            if(snapshot.exists()) {
                const parsedUser: UserType = snapshot.val()
                
                if(groupKey !== '' && user?.id) {
                    parsedUser?.groups && parsedUser.groups.splice(parsedUser.groups.indexOf(groupKey), 1)
                    updates['/users/' + user.id] = {
                        ...parsedUser,
                        name: user.name,
                        groups: parsedUser?.groups ? [...parsedUser.groups] : []
                    };
                    updateFirebase(updates)
                }
            }
            else {
                console.error("No data available!")
            }
        }).catch(error => console.error(error))
    }

    function removeUserFromGroup(groupKey: string) {        
        let updates: FirebaseGroupsType = {}

        firebaseGet(groupChild(groupKey)).then((snapshot) => {
            if(snapshot.exists()) {
                const parsedGroup: GroupType = snapshot.val()
                
                if(groupKey !== '' && user?.id) {
                    parsedGroup?.members && parsedGroup.members.splice(parsedGroup.members.indexOf(user.id), 1)
                    updates['/groups/' + groupKey] = {
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

    function sendMessageToGroup(message: MessageType, groupId: string) {
        const messagesChild = firebaseChild(firebaseRef(database), `groups/${groupId}/messages/`)
        const newMessageId = firebasePush(messagesChild).key

        let updates: FirebaseMessageType = {}
        if(user?.name) {
            updates[`groups/${groupId}/messages/${newMessageId}`] = {
                ...message
            };
            updateFirebase(updates)
        }
    }

    return { 
        addGroupToUser, 
        addUserToGroup, 
        removeGroupFromUser, 
        removeUserFromGroup, 
        createGroup, 
        updateFirebase,
        sendMessageToGroup
    }
}