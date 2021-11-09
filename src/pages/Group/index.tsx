import { Container, Description, ReturnButton, EventList, EventListItem, MembersList, MembersListItem } from "./styles"

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { useAuth } from "../../hooks/useAuth"
import logoImg from '../../assets/logo.svg'
import Divider from '@mui/material/Divider'
import { database, firebaseRef, firebaseChild, firebaseGet } from "../../services/firebase"
import { GroupType } from "../../interfaces/types"

type ParamsType = {
    id: string
}

export function Group() {
    const { user } = useAuth()
    const history = useHistory()
    const params: ParamsType = useParams()
    const [group, setGroup] = useState<GroupType>({} as GroupType)

    function handleReturn() {
        history.goBack()
    }

    useEffect(() => {
        if(!user) {
            history.push('/')
            return
        }
        else if (params.id) {
            const groupRef = firebaseRef(database)
            firebaseGet(firebaseChild(groupRef, "group/" + params.id)).then((snapshot) => {
                if(snapshot.exists()) {
                    const parsedGroup: GroupType = snapshot.val()
                    setGroup(parsedGroup)
                }
                else {
                    console.log("No data available!")
                }
            }).catch(error => console.error(error))
        }
    }, [])

    return(
        <Container>
            {
                user && (
                    <>
                        <ReturnButton onClick={handleReturn}><KeyboardBackspaceIcon color="secondary" fontSize="large"/></ReturnButton>
                        <Description>
                            <div>
                                <div className="group-header">
                                    <p>{group.name}</p>
                                    <p>Local: {group.city}</p>
                                    <p>Membros: 12</p>
                                </div> 
                                <div className="group-description">
                                    <p>{group.description}</p>
                                </div> 
                            </div>
                            <div>
                                <img src={logoImg} alt="Imagem" />
                            </div>
                        </Description>
                        <Divider/>
                        <div>
                            <EventList>
                                <p>Eventos</p>
                                <ul>
                                    <EventListItem>
                                        <div className="event-header">
                                            <p>Evento de atividades legais</p>
                                            <p>Local: SP</p>
                                            <p>Membros: 12</p>
                                        </div> 
                                        <div>
                                            <img src={logoImg} alt="Imagem" />
                                        </div>
                                    </EventListItem>
                                    <EventListItem>
                                        <div className="event-header">
                                            <p>Evento de atividades legais</p>
                                            <p>Local: SP</p>
                                            <p>Membros: 12</p>
                                        </div> 
                                        <div>
                                            <img src={logoImg} alt="Imagem" />
                                        </div>
                                    </EventListItem>
                                </ul>
                            </EventList>
                            <MembersList>
                            <p>Eventos</p>
                                <ul>
                                    <MembersListItem>
                                        <div className="event-header">
                                            <p>Evento de atividades legais</p>
                                            <p>Local: SP</p>
                                            <p>Membros: 12</p>
                                        </div> 
                                        <div>
                                            <img src={logoImg} alt="Imagem" />
                                        </div>
                                    </MembersListItem>
                                    <MembersListItem>
                                        <div className="event-header">
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