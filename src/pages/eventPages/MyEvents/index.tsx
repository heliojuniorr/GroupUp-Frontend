import { useAuth } from "../../../hooks/useAuth";
import { Container } from "./styles";
import { database, firebaseRef, firebaseChild, firebaseGet } from "../../../services/firebase"
import { useEffect, useState } from "react";
import { EventType, UserType } from "../../../interfaces/types";
import { EventCard } from "../../../components/EventCard";
import { TextField } from "@mui/material";

export function MyEvents() {
    const { user } = useAuth()
    const [events, setEvents] = useState<EventType[]>([] as EventType[])
    const [filter, setFilter] = useState('')

    useEffect(() => {
        if(user) {
            const dbRef = firebaseRef(database)
            firebaseGet(firebaseChild(dbRef, "users/" + user.id)).then((snapshot) => {
                if(snapshot.exists()) {
                    const user: UserType = snapshot.val()
                    let eventTemp: EventType[] = []

                    user?.events?.forEach((eventId) => {
                        firebaseGet(firebaseChild(dbRef, "events/" + eventId)).then((snapshot) => {
                            if(snapshot.exists()) {
                                const parsedEvent: EventType = {
                                    id: eventId,
                                    ...snapshot.val()
                                } 
                                eventTemp = [...eventTemp, parsedEvent]
                            }
                            else {
                                console.log("No data available!")
                            }

                            if(user?.events && user?.events[user?.events?.length - 1] === eventId) {
                                setEvents(eventTemp)
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
                                <p className={'default-message'}>Nenhum evento encontrado. Comece criando o seu evento ou entrando em um grupo com eventos.</p>
                            )
                        }
                    </Container>
                )
            }
        </>
    )
}