import { useAuth } from "../../../hooks/useAuth";
import { ButtonsContainer, Chat, Container, ListsContainer, MembersList, MembersListItem, ReturnButton } from "./styles";
import logoImg from '../../../assets/logo.svg'
import Divider from '@mui/material/Divider'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { EventType, FirebaseMessageType, MessageType, ParamsType, UserType } from "../../../interfaces/types"
import { useHistory, useParams } from "react-router";
import { useState, useEffect } from "react";
import { database, firebaseRef, firebaseChild, firebaseGet, firebasePush, firebaseUpdate } from "../../../services/firebase"
import { EventCard } from "../../../components/EventCard";
import { MembersCard } from "../../../components/MembersCard";
import { Button, TextField } from "@mui/material";
import { Message } from "../../../components/Message"
import { useEvent } from "../../../hooks/useEvent";

export function Event() {
    const { user } = useAuth()
    const { sendMessageToEvent, addEventToUser, addUserToEvent, removeEventFromUser, removeUserFromEvent } = useEvent()
    const history = useHistory()
    const params: ParamsType = useParams()
    const [event, setEvent] = useState<EventType>({} as EventType)
    const [members, setMembers] = useState<UserType[]>([] as UserType[])
    const [message, setMessage] = useState<MessageType>({} as MessageType)
    const [messages, setMessages] = useState<MessageType[]>([] as MessageType[])
    const [isMember, setIsMember] = useState(false)

    function handleReturn() {
        history.goBack()
    }

    function handleEntryEvent() {
        if(!isMember && event && user?.name) {
            addEventToUser(event.id)
            addUserToEvent(event.id)
            setIsMember(true)
            setMembers([
                ...members,
                {
                    name: user.name
                }
            ])
        }
    }

    function handleLeaveEvent() {
        if(isMember && event) {
            setIsMember(false)
            removeEventFromUser(event.id)
            removeUserFromEvent(event.id)
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        }
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
            sendMessageToEvent(message, event.id)

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

                    let isMemberTemp = false
                    let membersTemp: UserType[] = []
                    parsedEvent.members?.forEach((memberId) => {
                        firebaseGet(firebaseChild(dbRef, "users/" + memberId)).then((snapshot) => {
                            if(snapshot.exists()) {
                                memberId === user.id && (isMemberTemp = true)
                                const parsedMember: UserType = snapshot.val()
                                membersTemp = [...membersTemp, parsedMember]
                            }
                            else {
                                console.log("No data available!")
                            }

                            if(parsedEvent?.members && parsedEvent.members[parsedEvent.members?.length - 1] === memberId) {
                                setMembers(membersTemp)
                                setIsMember(isMemberTemp)
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
                        <ButtonsContainer>
                            <ReturnButton onClick={handleReturn}><KeyboardBackspaceIcon color="secondary" fontSize="large"/></ReturnButton>
                            {
                                !isMember ? <Button variant="contained" onClick={handleEntryEvent}>Entrar</Button> : <Button variant="contained" onClick={handleLeaveEvent}>Sair</Button>
                            }
                        </ButtonsContainer>
                        <EventCard event={event} disabled={true}/>
                        <Divider className='divider'/>
                        <ListsContainer>
                            <MembersCard members={members}/>
                            {
                                isMember && (
                                    <Chat>
                                        <p>Chat</p>
                                        <div>
                                            {
                                                messages.length > 0 ? (
                                                    messages.map((message, index) => {
                                                        if(messages.length > 100) {
                                                            let startIndex = messages.length - 100 
                                                            
                                                            if(index >= startIndex) {
                                                                return(
                                                                    <Message key={index} message={message}/>
                                                                )
                                                            }
                                                        }
                                                        else {
                                                            return(
                                                                <Message key={index} message={message}/>
                                                            )
                                                        }
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
                                )
                            }
                        </ListsContainer>
                    </>
                )
            }
        </Container>
    )
}