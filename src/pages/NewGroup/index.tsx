import { Container } from "./styles";
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';

export function NewGroup() {
    return(
        <>
            <Container>
                <Button variant="contained">Criar</Button>
                <div>
                    <TextField required type="text" label="Nome"/>   
                    <TextField required type="text" label="Localização"/>
                </div>
                
                <TextField required type="text" label="Descrição"/>
                <TextField id="image-button" required type="file" variant="filled"/>
                <InputLabel htmlFor="image-button">Imagem</InputLabel>
            </Container>
        </>
        
    )
}