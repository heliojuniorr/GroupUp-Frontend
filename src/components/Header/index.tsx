import { useHistory } from "react-router";
import { Container, Nav } from "./styles";

export function Header() {
    const history = useHistory()

    function handleGroupClick() {
        history.push('/grouplist')
    }

    function handleEventClick() {
        history.push('/eventlist')
    }

    return(
        <Container>
            <Nav>
                <button onClick={handleGroupClick}>Grupos</button>
                <button onClick={handleEventClick}>Eventos</button>
            </Nav>
        </Container>
    )
}