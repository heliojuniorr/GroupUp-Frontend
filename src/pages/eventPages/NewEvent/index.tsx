import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { FirebaseEventType, UserType, GroupType, FirebaseUserType, FirebaseGroupsType } from "../../../interfaces/types";
import { firebaseChild, firebaseRef, database, firebasePush, firebaseUpdate, firebaseGet } from "../../../services/firebase";
import { Container } from "./styles";
import { Button, TextField, MenuItem, InputLabel } from "@mui/material";

type GroupListType = {
    id: string,
    name: string
}

export function NewEvent() {
    const { user } = useAuth()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [groupList, setGroupList] = useState<GroupListType[]>([])
    const [selectedGroup, setSelectedGroup] = useState<GroupListType>({} as GroupListType)

    function handleCreateEvent() {
        const eventChild = firebaseChild(firebaseRef(database), "events")
        const newEventKey = firebasePush(eventChild).key

        const groupChild = firebaseChild(firebaseRef(database), "groups/" + selectedGroup.id)
        firebaseGet(groupChild).then((snapshot) => {
            if(snapshot.exists()) {
                const parsedGroup: GroupType = snapshot.val()

                let groupUpdates: FirebaseGroupsType = {}
                if(newEventKey !== '' && newEventKey !== null) {
                    if(selectedGroup?.id) {
                        groupUpdates['/groups/' + selectedGroup.id] = {
                            ...parsedGroup,
                            events: parsedGroup?.events ? [...parsedGroup.events, newEventKey] : [newEventKey]
                        };
                        firebaseUpdate(firebaseRef(database), groupUpdates)
                    }

                    let eventUpdates: FirebaseEventType = {}
                    if(user?.id) {
                        eventUpdates['/events/' + newEventKey] = {
                            name,
                            description,
                            city: parsedGroup.city,
                            groupId : selectedGroup.id,
                            members: [user.id]
                        };
                        firebaseUpdate(firebaseRef(database), eventUpdates)
                    }
                }
            }
            else {
                console.error("No data available!")
            }
        }).catch(error => console.error(error))

        addEventToUsers(newEventKey || '')

        setName('')
        setDescription('')
        setSelectedGroup({} as GroupListType)
    }

    function addEventToUsers(eventKey: string) {
        const userChild = firebaseChild(firebaseRef(database), "users/" + user?.id)
        firebaseGet(userChild).then((snapshot) => {
            if(snapshot.exists()) {
                const parsedUser: UserType = snapshot.val()

                let updates: FirebaseUserType = {}
                if(eventKey !== '') {
                    if(user?.id) {
                        updates['/users/' + user.id] = {
                            ...parsedUser,
                            name: user.name,
                            events: parsedUser?.events ? [...parsedUser.events, eventKey] : [eventKey]
                        };
                        firebaseUpdate(firebaseRef(database), updates)
                    }
                }
            }
            else {
                console.error("No data available!")
            }
        }).catch(error => console.error(error))
    }

    function getGroups() {
        if(user) {
            const dbRef = firebaseRef(database)
            firebaseGet(firebaseChild(dbRef, "users/" + user.id)).then((snapshot) => {
                if(snapshot.exists()) {
                    const parsedUser: UserType = snapshot.val()
                    let groupListTemp: GroupListType[] = []
                    parsedUser.groups?.forEach((groupId) => {
                        firebaseGet(firebaseChild(dbRef, "groups/" + groupId)).then((snapshot) => {
                            if(snapshot.exists()) {
                                const parsedGroup: GroupType = snapshot.val()
                                groupListTemp = [
                                    ...groupListTemp,
                                    {
                                        id: groupId,
                                        name: parsedGroup.name
                                    }
                                ]  
                            }
                            else {
                                console.log("No data available!")
                            }

                            if(parsedUser?.groups && parsedUser?.groups[parsedUser.groups?.length - 1] === groupId) {
                                setGroupList(groupListTemp)
                            }
                        }).catch(error => console.error(error))
                    })
                }
                else {
                    console.log("No data available!")
                }
            }).catch(error => console.error(error))
        }
    }

    useEffect(() => {
        getGroups()
    }, [user])

    return(
        <>
            {
                user && (
                    <Container>
                        <Button variant="contained" onClick={handleCreateEvent}>Criar</Button>
                        <div>
                            <TextField required type="text" label="Nome" value={name} onChange={(e) => {setName(e.target.value)}}/>   
                            <TextField id="group" label="Group" value={selectedGroup.id || 'None'} select>
                            <MenuItem value="None" selected>None</MenuItem>
                            {
                                groupList.map((value) => {
                                    return(
                                        <MenuItem 
                                            key={value.id}
                                            value={value.id} 
                                            onClick={() => {
                                                setSelectedGroup({
                                                    id: value.id,
                                                    name: value.name
                                                })
                                            }}
                                        >
                                            {value.name}
                                        </MenuItem>
                                    )
                                })
                            }
                        </TextField>
                        </div>
                        <TextField required type="text" label="Descrição" value={description} onChange={(e) => {setDescription(e.target.value)}}/>
                    </Container>
                )
            
            }
        </>
    )
}