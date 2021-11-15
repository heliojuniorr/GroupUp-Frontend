import { Container, ReturnButton, EventList, EventListItem, MembersList, MembersListItem } from "./styles"

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { useAuth } from "../../../hooks/useAuth"
import logoImg from '../../../assets/logo.svg'
import Divider from '@mui/material/Divider'
import { database, firebaseRef, firebaseChild, firebaseGet } from "../../../services/firebase"
import { GroupType, EventType, UserType, ParamsType } from "../../../interfaces/types"
import { GroupCard } from "../../../components/GroupCard"

export function Group() {
    const { user } = useAuth()
    const history = useHistory()
    const params: ParamsType = useParams()
    const [group, setGroup] = useState<GroupType>({} as GroupType)
    const [events, setEvents] = useState<EventType[]>([] as EventType[])
    const [members, setMembers] = useState<UserType[]>([] as UserType[])

    function handleReturn() {
        history.goBack()
    }

    function handleEventClick(id: string) {
        history.push('/event/' + id)
    }

    useEffect(() => {
        if (params.id && user) {
            const dbRef = firebaseRef(database)
            firebaseGet(firebaseChild(dbRef, "groups/" + params.id)).then((snapshot) => {
                if(snapshot.exists()) {
                    const parsedGroup: GroupType = snapshot.val()
                    setGroup(parsedGroup)
                    let membersTemp: UserType[] = []

                    parsedGroup.members.forEach((memberId) => {
                        firebaseGet(firebaseChild(dbRef, "users/" + memberId)).then((snapshot) => {
                            if(snapshot.exists()) {
                                const parsedMember: UserType = snapshot.val()
                                membersTemp = [...membersTemp, parsedMember]
                            }
                            else {
                                console.log("No data available!")
                            }

                            if(parsedGroup?.members && parsedGroup.members[parsedGroup.members?.length - 1] === memberId) {
                                setMembers(membersTemp)
                            }
                        }).catch(error => console.error(error))
                    })

                    let eventsTemp: EventType[] = []
                    parsedGroup.events?.forEach((eventId) => {
                        firebaseGet(firebaseChild(dbRef, "events/" + eventId)).then((snapshot) => {
                            if(snapshot.exists()) {
                                const parsedEvent: EventType = {
                                    id: eventId,
                                    ...snapshot.val()
                                }
                                eventsTemp = [...eventsTemp, parsedEvent]
                            }
                            else {
                                console.log("No data available!")
                            }

                            if(parsedGroup?.events && parsedGroup.events[parsedGroup.events?.length - 1] === eventId) {
                                setEvents(eventsTemp)
                            }
                        }).catch(error => console.error(error))
                    })
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
                        {
                            <GroupCard group={group} disabled={true}/>
                        }
                        <Divider/>
                        <div>
                            <EventList>
                                <p>Eventos</p>
                                <ul>
                                    {
                                        events.map((value) => {
                                            return(
                                                <EventListItem onClick={() => {handleEventClick(value.id)}}>
                                                    <div className="event-header">
                                                        <p>{value.name}</p>
                                                        <p>Local: {value.city}</p>
                                                        <p>Membros: {value.members?.length}</p>
                                                    </div> 
                                                    <div>
                                                        <img src={logoImg} alt="Imagem" />
                                                    </div>
                                                </EventListItem>
                                            )
                                        })
                                    }
                                </ul>
                            </EventList>
                            <MembersList>
                            <p>Membros</p>
                                <ul>
                                    {
                                        members.map((value) => {
                                            return(
                                                <MembersListItem>
                                                    <div className="member-header">
                                                        <p>{value?.name}</p>
                                                    </div> 
                                                    <div>
                                                        <img src={logoImg} alt="Imagem" />
                                                    </div>
                                                </MembersListItem>
                                            )
                                        })
                                    }
                                </ul>
                            </MembersList>
                        </div>
                    </>
                )
            }
        </Container>
    )
}