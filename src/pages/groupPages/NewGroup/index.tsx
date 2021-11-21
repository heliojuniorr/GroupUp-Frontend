import { Container } from "./styles";

import TextField from '@mui/material/TextField';
import { Button, MenuItem } from "@mui/material";
import { useAuth } from "../../../hooks/useAuth";
import { Dispatch, useState } from "react";
import { images, TextFieldType } from "../../../interfaces/types"
import { useGroup } from "../../../hooks/useGroup";

export function NewGroup() {
    const { user } = useAuth()
    const { createGroup } = useGroup()
    const textFieldDefaultValue: TextFieldType = { error: false, value: '' }
    const [name, setName] = useState<TextFieldType>(textFieldDefaultValue)
    const [city, setCity] = useState<TextFieldType>(textFieldDefaultValue)
    const [description, setDescription] = useState<TextFieldType>(textFieldDefaultValue)
    const [image, setImage] = useState<TextFieldType>(textFieldDefaultValue)

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

    function handleCreateGroup() {
        let hasError = false

        validateField(name, setName) && (hasError = true)
        validateField(city, setCity) && (hasError = true)
        validateField(description, setDescription) && (hasError = true)
        validateField(image, setImage) && (hasError = true)

        if(!hasError) {
            createGroup(name.value, description.value, city.value, image.value)
            setName(textFieldDefaultValue)
            setCity(textFieldDefaultValue)
            setDescription(textFieldDefaultValue)
            setImage(textFieldDefaultValue)
        }
    }

    return(
        <>
            {
                user && (
                    <Container>
                        <Button variant="contained" onClick={handleCreateGroup}>Criar</Button>
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
                                required 
                                type="text" 
                                label="Cidade" 
                                value={city.value} 
                                error={city.error} onChange={(e) => {setCity({...city, value: e.target.value})}}
                            />
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
                                    Object.entries(images).map((value) => {
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