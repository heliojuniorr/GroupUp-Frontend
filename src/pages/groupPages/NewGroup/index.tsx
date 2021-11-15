import { Container } from "./styles";
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import { useAuth } from "../../../hooks/useAuth";
import { database, firebaseRef, firebasePush, firebaseChild, firebaseUpdate, firebaseGet } from "../../../services/firebase"
import { useState } from "react";
import { FirebaseGroupsType } from "../../../interfaces/types"
import { useGroup } from "../../../hooks/useGroup";

export function NewGroup() {
    const { user } = useAuth()
    const { addGroupToUser } = useGroup()
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

    return(
        <>
            {
                user && (
                    <Container>
                        <Button variant="contained" onClick={handleCreateGroup}>Criar</Button>
                        <div>
                            <TextField required type="text" label="Nome" value={name} onChange={(e) => {setName(e.target.value)}}/>   
                            <TextField required type="text" label="Cidade" value={city} onChange={(e) => {setCity(e.target.value)}}/>
                        </div>
                        <TextField required type="text" label="Descrição" value={description} onChange={(e) => {setDescription(e.target.value)}}/>
                    </Container>
                )
            }
        </>
        
    )
}