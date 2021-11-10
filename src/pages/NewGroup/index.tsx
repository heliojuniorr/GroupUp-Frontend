import { Container } from "./styles";
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import { useAuth } from "../../hooks/useAuth";
import { database, firebaseRef, firebasePush, firebaseChild, firebaseUpdate } from "../../services/firebase"
import { useState } from "react";
import { FirebaseGroupsType, FirebaseUserType } from "../../interfaces/types"

export function NewGroup() {
    const { user } = useAuth()
    const [name, setName] = useState('')
    const [city, setCity] = useState('')
    const [description, setDescription] = useState('')

    function handleCreateGroup() {
        const groupChild = firebaseChild(firebaseRef(database), "groups")
        const newGroupKey = firebasePush(groupChild).key

        let updates: FirebaseGroupsType = {}
        if(user?.id) {
            updates['/groups/' + newGroupKey] = {
                authorId: user.id,
                name,
                description,
                city,
                members: [user.id]
            };
            firebaseUpdate(firebaseRef(database), updates)
        }

        addGroupToUser(newGroupKey || '')

        setName('')
        setCity('')
        setDescription('')
    }

    function addGroupToUser(groupKey: string) {
        const userChild = firebaseChild(firebaseRef(database), "users")

        let updates: FirebaseUserType = {}
        if(groupKey !== '') {
            if(user?.id) {
                updates['/users/' + user.id] = {
                    groups: [groupKey]
                };
                firebaseUpdate(firebaseRef(database), updates)
            }
        }
    }

    return(
        <>
            <Container>
                {
                    user && (
                        <>
                            <Button variant="contained" onClick={handleCreateGroup}>Criar</Button>
                            <div>
                                <TextField required type="text" label="Nome" value={name} onChange={(e) => {setName(e.target.value)}}/>   
                                <TextField required type="text" label="Cidade" value={city} onChange={(e) => {setCity(e.target.value)}}/>
                            </div>
                            
                            <TextField required type="text" label="Descrição" value={description} onChange={(e) => {setDescription(e.target.value)}}/>
                            <TextField id="image-button" required type="file" variant="filled"/>
                            <InputLabel htmlFor="image-button">Imagem</InputLabel>
                        </>
                    )
                }
                
            </Container>
        </>
        
    )
}