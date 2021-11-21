import { Dispatch, useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { UserType, GroupType, FirebaseUserType, TextFieldType, iconImages, GroupListType } from "../../../interfaces/types";
import { firebaseChild, firebaseRef, database, firebaseGet } from "../../../services/firebase";
import { Container } from "./styles";
import { Button, TextField, MenuItem, InputLabel } from "@mui/material";
import { useEvent } from "../../../hooks/useEvent";

export function NewEvent() {
    const { user } = useAuth()
    const { createEvent } = useEvent()
    const textFieldDefaultValue: TextFieldType = { error: false, value: '' }
    const [name, setName] = useState<TextFieldType>(textFieldDefaultValue)
    const [description, setDescription] = useState<TextFieldType>(textFieldDefaultValue)
    const [image, setImage] = useState<TextFieldType>(textFieldDefaultValue)
    const [groupList, setGroupList] = useState<GroupListType[]>([])
    const [selectedGroup, setSelectedGroup] = useState<GroupListType>({} as GroupListType)
    const [groupFieldError, setGroupFieldError] = useState(false)

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

    function validateGroupField(): boolean {
        let hasError = false

        if(selectedGroup.id) {
            setGroupFieldError(false)
        }
        else { 
            hasError = true
            setSelectedGroup({} as GroupListType)
            setGroupFieldError(true)
        }

        return hasError
    }

    function handleCreateEvent() {
        let hasError = false

        validateField(name, setName) && (hasError = true)
        validateField(description, setDescription) && (hasError = true)
        validateField(image, setImage) && (hasError = true)
        validateGroupField() && (hasError = true)

        if(!hasError) {
            createEvent(name.value, description.value, selectedGroup, image.value)
            setName(textFieldDefaultValue)
            setDescription(textFieldDefaultValue)
            setSelectedGroup({} as GroupListType)
        }
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
                            <TextField 
                                required 
                                type="text" 
                                label="Nome" 
                                value={name.value} 
                                error={name.error} 
                                onChange={(e) => {setName({...name, value: e.target.value})}}
                            />   
                            <TextField 
                                id="group" 
                                label="Grupo" 
                                value={selectedGroup.id || 'None'} 
                                error={groupFieldError} 
                                select
                            >
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
                        <div>
                            <TextField 
                                required 
                                type="text" 
                                label="Descrição" 
                                value={description.value} 
                                error={description.error} 
                                onChange={(e) => {setDescription({...description, value: e.target.value})}}
                            />
                            <TextField 
                                id="images" 
                                label="Ícone" 
                                value={image.value || 'None'} error={image.error} 
                                select
                            >
                                <MenuItem value="None" selected>None</MenuItem>
                                {
                                    Object.entries(iconImages).map((value) => {
                                        return(
                                            <MenuItem 
                                                key={value[0]}
                                                value={value[0]} 
                                                onClick={() => {
                                                    setImage({...image, value: value[0]})
                                                }}
                                            >
                                                {value[0]}
                                            </MenuItem>
                                        )
                                    })
                                }
                            </TextField>
                        </div>
                    </Container>
                )
            }
        </>
    )
}