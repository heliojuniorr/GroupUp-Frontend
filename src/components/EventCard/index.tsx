import { useHistory } from "react-router"
import { useAuth } from "../../hooks/useAuth"
import { EventCardParams } from "../../interfaces/types"
import { Container, EventListItem } from "./styles"
import logoImg from '../../assets/logo.svg'

export function EventCard({ event, disabled = false }: EventCardParams) {
    const { user } = useAuth()
    const history = useHistory()

    function handleEventSelection(id: string) {
        !disabled && history.push('event/' + id)
    }

    return(
        <>
            {
                user && (
                    <Container>
                        <EventListItem disabled={disabled} onClick={() => {handleEventSelection(event.id)}}>
                            <div>
                                <div className="event-header">
                                    <p>{event.name}</p>
                                    <p>Local: {event.city}</p>
                                    <p>Membros: {event.members?.length}</p>
                                </div> 
                                <div className="event-description">
                                    <p>{event.description}</p>
                                </div> 
                            </div>
                            <div>
                                <img src={logoImg} alt="Imagem" />
                            </div> 
                        </EventListItem>
                    </Container>
                )
            }
        </>
    )
}