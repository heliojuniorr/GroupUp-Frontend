import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../../../hooks/useAuth";
import { Container, EventListItem } from "./styles";
import logoImg from '../../../assets/logo.svg'
import { EventType, FirebaseEventType } from "../../../interfaces/types";
import { database, firebaseRef, firebaseChild, firebaseGet } from "../../../services/firebase"

export function EventList() {
    const { user } = useAuth()
    const history = useHistory()
    const [events, setEvents] = useState<EventType[]>([] as EventType[])

    function handleClick(id: string) {
        history.push('/event/' + id)
    }

    useEffect(() => {
        if(user) {
            const eventRef = firebaseRef(database)
            firebaseGet(firebaseChild(eventRef, "events/")).then((snapshot) => {
                if(snapshot.exists()) {
                    const firebaseEvents: FirebaseEventType = snapshot.val()
                    const parsedEvents: EventType[] = Object.entries(firebaseEvents).map(([key, value]) => {
                        return{
                            id: key,
                            groupId: value.groupId,
                            name: value.name,
                            description: value.description,
                            city: value.city,
                            members: value.members
                        }
                    })
                    setEvents(parsedEvents)
                }
                else {
                    console.log("No data available!")
                }
            }).catch(error => console.error(error))
        }
    }, [user])

    return(
        <>
            <Container>
                {
                    user && (
                        <ul>
                            {
                                events.map((value) => {
                                    return(
                                        <li>
                                            <EventListItem onClick={() => {handleClick(value.id)}}>
                                                <div>
                                                    <div className="event-header">
                                                        <p>{value.name}</p>
                                                        <p>Local: {value.city}</p>
                                                        <p>Membros: 12</p>
                                                    </div> 
                                                    <div className="event-description">
                                                        <p>{value.description}</p>
                                                    </div> 
                                                </div>
                                                <div>
                                                    <img src={logoImg} alt="Imagem" />
                                                </div>
                                            </EventListItem>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    )
                }
            </Container>
        </>
    )
}