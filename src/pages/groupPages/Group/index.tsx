import { Container, ButtonsContainer, ListsContainer, ReturnButton, EventList, EventListItem, Chat } from "./styles"

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { useAuth } from "../../../hooks/useAuth"
import logoImg from '../../../assets/logo.svg'
import Divider from '@mui/material/Divider'
import { database, firebaseRef, firebaseChild, firebaseGet, firebasePush, firebaseUpdate } from "../../../services/firebase"
import { GroupType, EventType, UserType, ParamsType, MessageType, FirebaseGroupsType, FirebaseMessageType } from "../../../interfaces/types"
import { GroupCard } from "../../../components/GroupCard"
import { Button, TextField } from "@mui/material"
import { useGroup } from "../../../hooks/useGroup"
import { MembersCard } from "../../../components/MembersCard"
import { Message } from "../../../components/Message"

export function Group() {
    const { user } = useAuth()
    const { addGroupToUser, addUserToGroup, removeGroupFromUser, removeUserFromGroup } = useGroup()
    const history = useHistory()
    const params: ParamsType = useParams()
    const [message, setMessage] = useState<MessageType>({} as MessageType)
    const [group, setGroup] = useState<GroupType>({} as GroupType)
    const [events, setEvents] = useState<EventType[]>([] as EventType[])
    const [members, setMembers] = useState<UserType[]>([] as UserType[])
    const [isMember, setIsMember] = useState(false)
    const [messages, setMessages] = useState<MessageType[]>([] as MessageType[])

    function handleReturn() {
        history.goBack()
    }

    function handleEventClick(id: string) {
        history.push('/event/' + id)
    }

    function handleEntryGroup() {
        if(!isMember && group && user?.name) {
            addGroupToUser(group.id)
            addUserToGroup(group.id)
            setIsMember(true)
            setMembers([
                ...members,
                {
                    name: user.name
                }
            ])
        }
    }

    function handleLeaveGroup() {
        if(isMember && group) {
            setIsMember(false)
            removeGroupFromUser(group.id)
            removeUserFromGroup(group.id)
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

    function handleSendMessage(event: any) {
        if(event.keyCode === 13) {
            const messagesChild = firebaseChild(firebaseRef(database), `groups/${group.id}/messages/`)
            const newMessageId = firebasePush(messagesChild).key

            let updates: FirebaseMessageType = {}
            if(user?.name) {
                updates[`groups/${group.id}/messages/${newMessageId}`] = {
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
            firebaseGet(firebaseChild(dbRef, "groups/" + params.id)).then((snapshot) => {
                if(snapshot.exists()) {
                    const parsedGroup: GroupType = {
                        id: params.id,
                        ...snapshot.val()
                    }
                    if(parsedGroup.messages) {
                        let messagesTemp: MessageType[] = Object.entries(parsedGroup.messages).map(([key, value]) => {
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

            if(!history.location.pathname.includes('/group/')) {
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
            firebaseGet(firebaseChild(dbRef, "groups/" + params.id)).then((snapshot) => {
                if(snapshot.exists()) {
                    const parsedGroup: GroupType = {
                        id: params.id,
                        ...snapshot.val()
                    }
                    setGroup(parsedGroup)
                    if(parsedGroup.messages) {
                        let messagesTemp: MessageType[] = Object.entries(parsedGroup.messages).map(([key, value]) => {
                            return {
                                content: value.content,
                                authorName: value.authorName
                            }
                        })
                        setMessages(messagesTemp)
                    }

                    let membersTemp: UserType[] = []
                    let isMemberTemp = false

                    parsedGroup.members?.forEach((memberId) => {
                        firebaseGet(firebaseChild(dbRef, "users/" + memberId)).then((snapshot) => {
                            if(snapshot.exists()) {
                                memberId === user.id && (isMemberTemp = true)
                                const parsedMember: UserType = snapshot.val()
                                membersTemp = [...membersTemp, parsedMember]
                            }
                            else {
                                console.log("No data available!")
                            }

                            if(parsedGroup?.members && parsedGroup.members[parsedGroup.members?.length - 1] === memberId) {
                                setMembers(membersTemp)
                                setIsMember(isMemberTemp)
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
        <>
            {
                user && (
                    <Container>
                        <ButtonsContainer>
                            <ReturnButton onClick={handleReturn}><KeyboardBackspaceIcon color="secondary" fontSize="large"/></ReturnButton>
                            {
                                !isMember ? <Button variant="contained" onClick={handleEntryGroup}>Entrar</Button> : <Button variant="contained" onClick={handleLeaveGroup}>Sair</Button>
                            }
                        </ButtonsContainer>
                        <GroupCard group={group} disabled={true}/>
                        <Divider className='divider'/>
                        <ListsContainer>
                            <EventList>
                                <p>Eventos</p>
                                <ul>
                                    {
                                        events.length > 0 ? (
                                            events.map((value) => {
                                                return(
                                                    <EventListItem key={value.id} onClick={() => {handleEventClick(value.id)}}>
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
                                        ) : (
                                            <div>Sem eventos disponíveis.</div>
                                        )
                                    }
                                </ul>
                            </EventList>
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
                    </Container>
                )
            }
        </>
    )
}