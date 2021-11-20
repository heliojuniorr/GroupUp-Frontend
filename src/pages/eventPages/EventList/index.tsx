import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../../../hooks/useAuth";
import { Container } from "./styles";
import logoImg from '../../../assets/logo.svg'
import { EventType, FirebaseEventType } from "../../../interfaces/types";
import { database, firebaseRef, firebaseChild, firebaseGet } from "../../../services/firebase"
import { EventCard } from "../../../components/EventCard";

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
            {
                user && (
                    <Container>
                        {
                            events.map((value) => {
                                return(
                                    <EventCard key={value.id} event={value}/>
                                )
                            })
                        }
                    </Container>
                )
            }
        </>
    )
}