import { Container, Brand, Authentication } from "./styles";
import logoImg from "../../assets/logo.svg"
import googleIconImg from "../../assets/google-icon.svg"

export function Home() {

    return(
        <>
            <Container>
                <Brand>
                    <img src={logoImg} alt="Logo" />
                    <strong>Encontre colegas para as suas aventuras</strong>
                    <p>Conheça pessoas que fazem o que você gosta de fazer</p>
                </Brand>   
                <Authentication>
                    <h1>GroupUp(Logo)</h1>
                    <button>
                        <img src={googleIconImg} alt="Logo do Google" />
                        Entre com sua conta do Google
                    </button>

                </Authentication>
            </Container>
        </>
    )
    
}