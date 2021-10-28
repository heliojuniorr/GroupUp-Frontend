import { Container } from "./styles";
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import { useAuth } from "../../hooks/useAuth";

export function NewGroup() {
    const { user } = useAuth()


    return(
        <>
            <Container>
                {
                    user && (
                        <>
                            <Button variant="contained">Criar</Button>
                            <div>
                                <TextField required type="text" label="Nome"/>   
                                <TextField required type="text" label="Localização"/>
                            </div>
                            
                            <TextField required type="text" label="Descrição"/>
                            <TextField id="image-button" required type="file" variant="filled"/>
                            <InputLabel htmlFor="image-button">Imagem</InputLabel>
                        </>
                    )
                }
                
            </Container>
        </>
        
    )
}