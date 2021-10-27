import { useHistory } from "react-router";
import { Container, Nav } from "./styles";
import { Navigator } from "../Navigator";
import { useState } from "react";

export function Header() {
    const history = useHistory()
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)


    function handleGroupClick() {
        history.push('/grouplist')
    }

    function handleEventClick() {
        history.push('/eventlist')
    }

    function toggleDrawer() {
        setIsDrawerOpen(!isDrawerOpen)
    }

    return(
        <Container>
            <Navigator open={isDrawerOpen} onOpen={toggleDrawer} onClose={toggleDrawer}/>
            <Nav>
                <button onClick={toggleDrawer}>Grupos</button>
                <button onClick={handleEventClick}>Eventos</button>
            </Nav>
        </Container>
    )
}