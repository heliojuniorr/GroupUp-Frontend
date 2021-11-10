import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { FirebaseEventType, FirebaseUserType } from "../../interfaces/types";
import { firebaseChild, firebaseRef, database, firebasePush, firebaseUpdate } from "../../services/firebase";
import { Container } from "./styles";
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';

export function NewEvent() {
    const { user } = useAuth()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [groupId, setGroupId] = useState('')

    function handleCreateEvent() {
        const eventChild = firebaseChild(firebaseRef(database), "events")
        const newEventKey = firebasePush(eventChild).key

        let updates: FirebaseEventType = {}
        if(user?.id) {
            updates['/events/' + newEventKey] = {
                name,
                description,
                city: '',
                groupId,
                members: [user.id]
            };
            firebaseUpdate(firebaseRef(database), updates)
        }

        addEventToUsers(newEventKey || '')

        setName('')
        setDescription('')
        setGroupId('')
    }

    function addEventToUsers(eventKey: string) {
        const userChild = firebaseChild(firebaseRef(database), "users")

        let updates: FirebaseUserType = {}
        if(eventKey !== '') {
            if(user?.id) {
                updates['/users/' + user.id] = {
                    events: [eventKey]
                };
                firebaseUpdate(firebaseRef(database), updates)
            }
        }
    }


    return(
        <Container>
            {
                user && (
                    <>
                        <Button variant="contained" onClick={handleCreateEvent}>Criar</Button>
                        <div>
                            <TextField required type="text" label="Nome" value={name} onChange={(e) => {setName(e.target.value)}}/>   
                        </div>
                        
                        <TextField required type="text" label="Descrição" value={description} onChange={(e) => {setDescription(e.target.value)}}/>
                        <TextField id="image-button" required type="file" variant="filled"/>
                        <InputLabel htmlFor="image-button">Imagem</InputLabel>
                    </>
                )
            }
        </Container>
    )
}