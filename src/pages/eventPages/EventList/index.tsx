import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../../../hooks/useAuth";
import { Container } from "./styles";
import { EventType, FirebaseEventType } from "../../../interfaces/types";
import { database, firebaseRef, firebaseChild, firebaseGet } from "../../../services/firebase"
import { EventCard } from "../../../components/EventCard";
import { TextField } from "@mui/material";

export function EventList() {
    const { user } = useAuth()
    const history = useHistory()
    const [events, setEvents] = useState<EventType[]>([] as EventType[])
    const [filter, setFilter] = useState('')

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
                            image: value.image,
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
                        <TextField 
                            className={"filter-field"}
                            type="text" 
                            label="Buscar" 
                            value={filter} 
                            onChange={(e) => {setFilter(e.target.value)}}
                        /> 
                        {
                            events.length > 0 ? (
                                events.filter(value => value.name.toLowerCase().includes(filter.toLowerCase()) || 
                                value.description.toLowerCase().includes(filter.toLowerCase()) || 
                                value.city.toLowerCase().includes(filter.toLowerCase())).map((value) => {
                                    return(
                                        <EventCard key={value.id} event={value}/>
                                    )
                                })
                            ) : (
                                <p className={'default-message'}>Nenhum evento encontrado. Comece criando o seu evento.</p>
                            )
                        }
                    </Container>
                )
            }
        </>
    )
}