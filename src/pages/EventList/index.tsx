import { useEffect } from "react";
import { useHistory } from "react-router";
import { Header } from "../../components/Header";
import { useAuth } from "../../hooks/useAuth";
import { Container, ListEvent } from "./styles";
import logoImg from '../../assets/logo.svg'

export function EventList() {
    const { user } = useAuth()
    const history = useHistory()

    useEffect(() => {
        if(!user) {
            history.push('/')
        }
    }, [])

    return(
        <>
            <Header/>
            <Container>
                {
                    user && (
                        <ul>
                            <li>
                                <ListEvent>
                                    <div>
                                        <div className="event-header">
                                            <p>Evento de atividades legais</p>
                                            <p>Local: SP</p>
                                            <p>Membros: 12</p>
                                        </div> 
                                        <div className="event-description">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et odio lectus. Duis tortor quam, efficitur eget blandit ut, porttitor at elit. Pellentesque pharetra sem.</p>
                                        </div> 
                                    </div>
                                    <div>
                                        <img src={logoImg} alt="Imagem" />
                                    </div>
                                </ListEvent>
                            </li>
                            <li>
                                <ListEvent>
                                    <div>
                                        <div className="event-header">
                                            <p>Evento de atividades legais</p>
                                            <p>Local: SP</p>
                                            <p>Membros: 12</p>
                                        </div> 
                                        <div className="event-description">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et odio lectus. Duis tortor quam, efficitur eget blandit ut, porttitor at elit. Pellentesque pharetra sem.</p>
                                        </div> 
                                    </div>
                                    <div>
                                        <img src={logoImg} alt="Imagem" />
                                    </div>
                                </ListEvent>
                            </li>
                            <li>
                                <ListEvent>
                                    <div>
                                        <div className="event-header">
                                            <p>Evento de atividades legais</p>
                                            <p>Local: SP</p>
                                            <p>Membros: 12</p>
                                        </div> 
                                        <div className="event-description">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et odio lectus. Duis tortor quam, efficitur eget blandit ut, porttitor at elit. Pellentesque pharetra sem.</p>
                                        </div> 
                                    </div>
                                    <div>
                                        <img src={logoImg} alt="Imagem" />
                                    </div>
                                </ListEvent>
                            </li>
                        </ul>
                    )
                }
            </Container>
        </>
    )
}