import { FirebaseGroupsType, FirebaseUserType, GroupType, UserType } from "../interfaces/types";
import { firebaseChild, firebaseRef, database, firebaseGet, firebaseUpdate } from "../services/firebase";
import { useAuth } from "./useAuth";

export function useGroup() {
    const { user } = useAuth()
    
    function addGroupToUser(groupKey: string) {        
        const userChild = firebaseChild(firebaseRef(database), "users/" + user?.id)
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
                    firebaseUpdate(firebaseRef(database), updates)
                }
            }
            else if(groupKey !== '' && user?.id){
                updates['/users/' + user.id] = {
                    name: user.name,
                    groups: [groupKey]
                };
                firebaseUpdate(firebaseRef(database), updates)
            }
        }).catch(error => console.error(error))
    }

    function addUserToGroup(groupKey: string) {        
        const groupChild = firebaseChild(firebaseRef(database), "groups/" + groupKey)
        let updates: FirebaseGroupsType = {}

        firebaseGet(groupChild).then((snapshot) => {
            if(snapshot.exists()) {
                const parsedGroup: GroupType = snapshot.val()
                
                if(groupKey !== '' && user?.id) {
                    updates['/groups/' + groupKey] = {
                        ...parsedGroup,
                        members: parsedGroup?.members ? [...parsedGroup.members, user.id] : [user.id]
                    };
                    firebaseUpdate(firebaseRef(database), updates)
                }
            }
            else {
                console.error("No data available!")
            }
        }).catch(error => console.error(error))
    }

    function removeGroupFromUser(groupKey: string) {        
        const userChild = firebaseChild(firebaseRef(database), "users/" + user?.id)
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
                    firebaseUpdate(firebaseRef(database), updates)
                }
            }
            else {
                console.error("No data available!")
            }
        }).catch(error => console.error(error))
    }

    function removeUserFromGroup(groupKey: string) {        
        const groupChild = firebaseChild(firebaseRef(database), "groups/" + groupKey)
        let updates: FirebaseGroupsType = {}

        firebaseGet(groupChild).then((snapshot) => {
            if(snapshot.exists()) {
                const parsedGroup: GroupType = snapshot.val()
                
                if(groupKey !== '' && user?.id) {
                    parsedGroup?.members && parsedGroup.members.splice(parsedGroup.members.indexOf(user.id), 1)
                    updates['/groups/' + groupKey] = {
                        ...parsedGroup,
                        members: parsedGroup?.members ? [...parsedGroup.members] : []
                    };
                    firebaseUpdate(firebaseRef(database), updates)
                }
            }
            else {
                console.error("No data available!")
            }
        }).catch(error => console.error(error))
    }

    return { addGroupToUser, addUserToGroup, removeGroupFromUser, removeUserFromGroup }
}