import { useAuth } from "../../../hooks/useAuth";
import { Container, Description, MembersList, MembersListItem, ReturnButton } from "./styles";
import logoImg from '../../../assets/logo.svg'
import Divider from '@mui/material/Divider'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { EventType, ParamsType } from "../../../interfaces/types"
import { useHistory, useParams } from "react-router";
import { useState, useEffect } from "react";
import { database, firebaseRef, firebaseChild, firebaseGet } from "../../../services/firebase"

export function Event() {
    const { user } = useAuth()
    const history = useHistory()
    const params: ParamsType = useParams()
    const [event, setEvent] = useState<EventType>({} as EventType)

    function handleReturn() {
        history.goBack()
    }

    useEffect(() => {
        if (params.id && user) {
            const eventRef = firebaseRef(database)
            firebaseGet(firebaseChild(eventRef, "events/" + params.id)).then((snapshot) => {
                if(snapshot.exists()) {
                    const parsedEvent: EventType = snapshot.val()
                    setEvent(parsedEvent)
                }
                else {
                    console.log("No data available!")
                }
            }).catch(error => console.error(error))
        }
    }, [user])

    return(
        <Container>
            {
                user && (
                    <>
                        <ReturnButton onClick={handleReturn}><KeyboardBackspaceIcon color="secondary" fontSize="large"/></ReturnButton>
                        <Description>
                            <div>
                                <div className="event-header">
                                    <p>{event.name}</p>
                                    <p>Local: {event.city}</p>
                                    <p>Membros: 12</p>
                                </div> 
                                <div className="event-description">
                                    <p>{event.description}</p>
                                </div> 
                            </div>
                            <div>
                                <img src={logoImg} alt="Imagem" />
                            </div>
                        </Description>
                        <Divider/>
                        <div>
                            <MembersList>
                            <p>Membros</p>
                                <ul>
                                    <MembersListItem>
                                        <div className="member-header">
                                            <p>Evento de atividades legais</p>
                                            <p>Local: SP</p>
                                            <p>Membros: 12</p>
                                        </div> 
                                        <div>
                                            <img src={logoImg} alt="Imagem" />
                                        </div>
                                    </MembersListItem>
                                    <MembersListItem>
                                        <div className="member-header">
                                            <p>Evento de atividades legais</p>
                                            <p>Local: SP</p>
                                            <p>Membros: 12</p>
                                        </div> 
                                        <div>
                                            <img src={logoImg} alt="Imagem" />
                                        </div>
                                    </MembersListItem>
                                </ul>
                            </MembersList>
                        </div>
                    </>
                )
            }
        </Container>
    )
}