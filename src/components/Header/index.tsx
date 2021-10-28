import { Container, Nav } from "./styles";
import { Navigator } from "../Navigator";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from "../../hooks/useAuth";

export function Header() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const {user} = useAuth()

    function toggleDrawer() {
        setIsDrawerOpen(!isDrawerOpen)
    }

    return(
        <Container>
            {
                user && (
                    <>
                        <Navigator open={isDrawerOpen} onOpen={toggleDrawer} onClose={toggleDrawer}/>
                        <Nav>
                            <button onClick={toggleDrawer}><MenuIcon/></button>
                        </Nav>
                    </>
                )
            }
        </Container>
    )
}