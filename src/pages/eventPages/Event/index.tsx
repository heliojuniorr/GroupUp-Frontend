import { useAuth } from "../../../hooks/useAuth";
import { Chat, Container, ListsContainer, MembersList, MembersListItem, ReturnButton } from "./styles";
import logoImg from '../../../assets/logo.svg'
import Divider from '@mui/material/Divider'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { EventType, FirebaseMessageType, MessageType, ParamsType, UserType } from "../../../interfaces/types"
import { useHistory, useParams } from "react-router";
import { useState, useEffect } from "react";
import { database, firebaseRef, firebaseChild, firebaseGet, firebasePush, firebaseUpdate } from "../../../services/firebase"
import { EventCard } from "../../../components/EventCard";
import { MembersCard } from "../../../components/MembersCard";
import { TextField } from "@mui/material";
import { Message } from "../../../components/Message"

export function Event() {
    const { user } = useAuth()
    const history = useHistory()
    const params: ParamsType = useParams()
    const [event, setEvent] = useState<EventType>({} as EventType)
    const [members, setMembers] = useState<UserType[]>([] as UserType[])
    const [message, setMessage] = useState<MessageType>({} as MessageType)
    const [messages, setMessages] = useState<MessageType[]>([] as MessageType[])

    function handleReturn() {
        history.goBack()
    }

    function handleMessageChange(event: any) {
        if(user?.name) {
            setMessage({
                authorName: user?.name,
                content: event.target.value
            })
        }
    }

    function handleSendMessage(e: any) {
        if(e.keyCode === 13) {
            console.log(`events/${event.id}/messages/`)
            const messagesChild = firebaseChild(firebaseRef(database), `events/${event.id}/messages/`)
            const newMessageId = firebasePush(messagesChild).key

            let updates: FirebaseMessageType = {}
            if(user?.name) {
                updates[`events/${event.id}/messages/${newMessageId}`] = {
                    ...message
                };
                firebaseUpdate(firebaseRef(database), updates)
            }

            setMessage({
                ...message,
                content: ''
            })
        }
    }

    function updateMessages(intervalId: any) {
        if (params.id && user) {
            const dbRef = firebaseRef(database)
            firebaseGet(firebaseChild(dbRef, "events/" + params.id)).then((snapshot) => {
                if(snapshot.exists()) {
                    const parsedEvent: EventType = {
                        id: params.id,
                        ...snapshot.val()
                    }
                    if(parsedEvent.messages) {
                        let messagesTemp: MessageType[] = Object.entries(parsedEvent.messages).map(([key, value]) => {
                            return {
                                content: value.content,
                                authorName: value.authorName
                            }
                        })
                        setMessages(messagesTemp)
                    }
                }
                else {
                    console.log("No data available!")
                }
            }).catch(error => console.error(error))

            if(!history.location.pathname.includes('/event/')) {
                clearInterval(intervalId)
            }
        }
    }

    useEffect(() => {
        if (params.id && user) {
            let intervalId = setInterval(() => {
                updateMessages(intervalId)
            }, 2000)
            
            const dbRef = firebaseRef(database)
            firebaseGet(firebaseChild(dbRef, "events/" + params.id)).then((snapshot) => {
                if(snapshot.exists()) {
                    const parsedEvent: EventType = {
                        id: params.id,
                        ...snapshot.val()
                    }
                    setEvent(parsedEvent)

                    if(parsedEvent.messages) {
                        let messagesTemp: MessageType[] = Object.entries(parsedEvent.messages).map(([key, value]) => {
                            return {
                                content: value.content,
                                authorName: value.authorName
                            }
                        })
                        setMessages(messagesTemp)
                    }

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
                        <ListsContainer>
                            <MembersCard members={members}/>
                            <Chat>
                                <p>Chat</p>
                                <div>
                                    {
                                        messages.length > 0 ? (
                                            messages.map((message, index) => {
                                                return(
                                                    <Message key={index} message={message}/>
                                                )
                                            })
                                        ) : (
                                            <p>Sem mensagens.</p>
                                        )
                                    }
                                    <TextField 
                                        className={'message-input'}
                                        required type="text" 
                                        label="Mensagem" 
                                        defaultValue={""}
                                        value={message.content}
                                        onChange={(e) => {handleMessageChange(e)}}
                                        onKeyDown={(e) => {handleSendMessage(e)}}
                                    />
                                </div>
                            </Chat>
                        </ListsContainer>
                    </>
                )
            }
        </Container>
    )
}