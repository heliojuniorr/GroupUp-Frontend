import { useAuth } from "../../hooks/useAuth";
import { Container } from "./styles";

export function NewEvent() {
    const { user } = useAuth()

    return(
        <Container>
            {
                user && (
                    <div>teste</div>
                )
            }
        </Container>
    )
}