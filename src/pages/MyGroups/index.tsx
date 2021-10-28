import { useAuth } from "../../hooks/useAuth";
import { Container } from "./styles";

export function MyGroups() {
    const { user } = useAuth()

    return(
        <Container>
            {
                user && (
                    <h1>teste</h1>
                )
            }
        </Container>
    )
}