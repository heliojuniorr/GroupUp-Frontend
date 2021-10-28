import { useEffect } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { Container, ListButton } from "./styles";
import logoImg from '../../assets/logo.svg'

export function GroupList() {
    const { user } = useAuth()
    const history = useHistory()

    useEffect(() => {
        if(!user) {
            history.push('/')
        }
    }, [])

    return(
        <>
            <Container>
                {
                    user && (
                        <ul>
                            <li>
                                <ListButton>
                                    <div>
                                        <div className="group-header">
                                            <p>Grupo de atividades legais</p>
                                            <p>Local: SP</p>
                                            <p>Membros: 12</p>
                                        </div> 
                                        <div className="group-description">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et odio lectus. Duis tortor quam, efficitur eget blandit ut, porttitor at elit. Pellentesque pharetra sem.</p>
                                        </div> 
                                    </div>
                                    <div>
                                        <img src={logoImg} alt="Imagem" />
                                    </div>
                                </ListButton>
                            </li>
                            <li>
                                <ListButton>
                                    <div>
                                        <div className="group-header">
                                            <p>Grupo de atividades legais</p>
                                            <p>Local: SP</p>
                                            <p>Membros: 12</p>
                                        </div> 
                                        <div className="group-description">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et odio lectus. Duis tortor quam, efficitur eget blandit ut, porttitor at elit. Pellentesque pharetra sem.</p>
                                        </div> 
                                    </div>
                                    <div>
                                        <img src={logoImg} alt="Imagem" />
                                    </div>
                                </ListButton>
                            </li>
                            <li>
                                <ListButton>
                                    <div>
                                        <div className="group-header">
                                            <p>Grupo de atividades legais</p>
                                            <p>Local: SP</p>
                                            <p>Membros: 12</p>
                                        </div> 
                                        <div className="group-description">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et odio lectus. Duis tortor quam, efficitur eget blandit ut, porttitor at elit. Pellentesque pharetra sem.</p>
                                        </div> 
                                    </div>
                                    <div>
                                        <img src={logoImg} alt="Imagem" />
                                    </div>
                                </ListButton>
                            </li>
                        </ul>
                    )
                }
            </Container>
        </>
    )
}