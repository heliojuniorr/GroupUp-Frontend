import { useAuth } from "../../hooks/useAuth";
import { Container } from "./styles";

export function Profile() {
    const { user } = useAuth()

    return(
        <Container>
            {
                user && (
                    <>
                        <div>teste</div>
                    </>
                )
            }
        </Container>
    )
}