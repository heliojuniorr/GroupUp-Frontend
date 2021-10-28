import { useHistory } from "react-router";
import { Container, Nav } from "./styles";
import { Navigator } from "../Navigator";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';

export function Header() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    function toggleDrawer() {
        setIsDrawerOpen(!isDrawerOpen)
    }

    return(
        <Container>
            <Navigator open={isDrawerOpen} onOpen={toggleDrawer} onClose={toggleDrawer}/>
            <Nav>
                <button onClick={toggleDrawer}><MenuIcon/></button>
            </Nav>
        </Container>
    )
}