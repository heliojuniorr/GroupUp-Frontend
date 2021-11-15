import { useAuth } from "../../../hooks/useAuth";
import { Container, MembersList, MembersListItem, ReturnButton } from "./styles";
import logoImg from '../../../assets/logo.svg'
import Divider from '@mui/material/Divider'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { EventType, ParamsType, UserType } from "../../../interfaces/types"
import { useHistory, useParams } from "react-router";
import { useState, useEffect } from "react";
import { database, firebaseRef, firebaseChild, firebaseGet } from "../../../services/firebase"
import { EventCard } from "../../../components/EventCard";
import { MembersCard } from "../../../components/MembersCard";

export function Event() {
    const { user } = useAuth()
    const history = useHistory()
    const params: ParamsType = useParams()
    const [event, setEvent] = useState<EventType>({} as EventType)
    const [members, setMembers] = useState<UserType[]>([] as UserType[])

    function handleReturn() {
        history.goBack()
    }

    useEffect(() => {
        if (params.id && user) {
            const dbRef = firebaseRef(database)
            firebaseGet(firebaseChild(dbRef, "events/" + params.id)).then((snapshot) => {
                if(snapshot.exists()) {
                    const parsedEvent: EventType = snapshot.val()
                    setEvent(parsedEvent)
                    let membersTemp: UserType[] = []

                    parsedEvent.members.forEach((memberId) => {
                        firebaseGet(firebaseChild(dbRef, "users/" + memberId)).then((snapshot) => {
                            if(snapshot.exists()) {
                                const parsedMember: UserType = snapshot.val()
                                membersTemp = [...membersTemp, parsedMember]
                            }
                            else {
                                console.log("No data available!")
                            }

                            if(parsedEvent?.members && parsedEvent.members[parsedEvent.members?.length - 1] === memberId) {
                                setMembers(membersTemp)
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
                        <EventCard event={event} disabled={true}/>
                        <Divider className='divider'/>
                        <div>
                            <MembersCard members={members}/>
                        </div>
                    </>
                )
            }
        </Container>
    )
}