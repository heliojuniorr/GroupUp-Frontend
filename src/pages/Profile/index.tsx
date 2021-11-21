import { useAuth } from "../../hooks/useAuth";
import { Container } from "./styles";
import { FirebaseUserType, profileImages, TextFieldType, UserType } from "../../interfaces/types";
import { useState, useEffect } from "react";
import { Button, MenuItem, TextField } from "@mui/material";
import { database, firebaseChild, firebaseGet, firebaseRef, firebaseUpdate } from "../../services/firebase";

export function Profile() {
    const { user } = useAuth()
    const [image, setImage] = useState<string>('')
    const userChild = firebaseChild(firebaseRef(database), `users/${user?.id}`)
    const updateFirebase = (updates: any) => firebaseUpdate(firebaseRef(database), updates) 

    function handleImageChange() {
        let updates: FirebaseUserType = {}

        firebaseGet(userChild).then((snapshot) => {
            if(snapshot.exists()) {
                const parsedUser: UserType = snapshot.val()
                
                if(image && user?.id) {
                    updates['/users/' + user.id] = {
                        ...parsedUser,
                        name: user.name,
                        image
                    };
                    updateFirebase(updates)
                }
            }
            else if(image && user?.id){
                updates['/users/' + user.id] = {
                    name: user.name,
                    image
                };
                updateFirebase(updates)
            }
        }).catch(error => console.error(error))
    }

    useEffect(() => {
        const userChild = firebaseChild(firebaseRef(database), `users/${user?.id}`)

        firebaseGet(userChild).then((snapshot) => {
            if(snapshot.exists()) {
                const parsedUser: UserType = snapshot.val()
                if(parsedUser?.image) {
                    setImage(parsedUser?.image)
                }
            }
            else {
                console.error("No data available!")
            }
        }).catch(error => console.error(error))
        
    }, [user])

    return(
        <Container>
            {
                user && (
                    <>
                        <p>Foto de perfil</p>
                        {/*@ts-ignore*/}
                        <img src={profileImages[image]} alt="Foto de perfil"/>
                        <TextField 
                            id="images" 
                            label="Ícone" 
                            value={image || 'None'} 
                            select
                        >
                            <MenuItem value="None" selected>None</MenuItem>
                            {
                                Object.entries(profileImages).map((value) => {
                                    return(
                                        <MenuItem 
                                            key={value[0]}
                                            value={value[0]} 
                                            onClick={() => {
                                                setImage(value[0])
                                            }}
                                        >
                                            {value[0]}
                                        </MenuItem>
                                    )
                                })
                            }
                        </TextField>
                        <Button onClick={handleImageChange} variant={'contained'}>Salvar</Button>
                    </>
                )
            }
        </Container>
    )
}