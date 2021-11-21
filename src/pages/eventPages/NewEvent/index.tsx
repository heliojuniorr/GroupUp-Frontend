import { Dispatch, useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { FirebaseEventType, UserType, GroupType, FirebaseUserType, FirebaseGroupsType, GroupListType, TextFieldType } from "../../../interfaces/types";
import { firebaseChild, firebaseRef, database, firebasePush, firebaseUpdate, firebaseGet } from "../../../services/firebase";
import { Container } from "./styles";
import { Button, TextField, MenuItem, InputLabel } from "@mui/material";
import { useEvent } from "../../../hooks/useEvent";

export function NewEvent() {
    const { user } = useAuth()
    const { createEvent } = useEvent()
    const textFieldDefaultValue: TextFieldType = { error: false, value: '' }
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [groupList, setGroupList] = useState<GroupListType[]>([])
    const [selectedGroup, setSelectedGroup] = useState<GroupListType>({} as GroupListType)

    const isEmpty = (value: string) => value === ''

    function validateField(value: TextFieldType, set: Dispatch<React.SetStateAction<TextFieldType>>): boolean { 
        let hasError = false
        if(isEmpty(value.value)) {
            hasError = true
            set({error: true, value: ''})
        }
        else { set({...value, error: false}) }

        return hasError
    }

    function handleCreateEvent() {
        createEvent(name, description, selectedGroup)
        //TODO: ver se está adicionando o evento para todos os usuários

        setName('')
        setDescription('')
        setSelectedGroup({} as GroupListType)
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
                            <TextField id="group" label="Grupo" value={selectedGroup.id || 'None'} select>
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