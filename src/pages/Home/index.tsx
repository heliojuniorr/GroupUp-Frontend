import { Container, Authentication } from "./styles";
import logoImg from "../../assets/logo.svg"
import googleIconImg from "../../assets/google-icon.svg"
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router";

export function Home() {
    const { user, signInWithGoogle } = useAuth()
    const history = useHistory()

    async function handleLogon() {
        if (!user) {
            await signInWithGoogle()
        }
        history.push('/grouplist')
    }

    return(
        <>
            <Container>
                <Authentication>
                    <img src={logoImg} alt="Logo" />
                    <strong>Encontre colegas para as suas aventuras</strong>
                    <p>Conheça pessoas que fazem o que você gosta de fazer</p>
                    <button onClick={handleLogon}>
                        <img src={googleIconImg} alt="Logo do Google" />
                        Entre com sua conta do Google
                    </button>
                </Authentication>
            </Container>
        </>
    )
    
}