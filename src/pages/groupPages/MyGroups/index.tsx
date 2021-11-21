import { Container } from "./styles";
import { useAuth } from "../../../hooks/useAuth";
import { database, firebaseRef, firebaseChild, firebaseGet } from "../../../services/firebase"
import { useEffect, useState } from "react";
import { GroupType, UserType } from "../../../interfaces/types";
import { GroupCard } from "../../../components/GroupCard";
import { TextField } from "@mui/material";

export function MyGroups() {
    const { user } = useAuth()
    const [groups, setGroups] = useState<GroupType[]>([] as GroupType[])
    const [filter, setFilter] = useState('')

    useEffect(() => {
        if(user) {
            const dbRef = firebaseRef(database)
            firebaseGet(firebaseChild(dbRef, "users/" + user.id)).then((snapshot) => {
                if(snapshot.exists()) {
                    const user: UserType = snapshot.val()
                    let groupTemp: GroupType[] = []

                    user?.groups?.forEach((groupId) => {
                        firebaseGet(firebaseChild(dbRef, "groups/" + groupId)).then((snapshot) => {
                            if(snapshot.exists()) {
                                const parsedGroup: GroupType = {
                                    id: groupId,
                                    ...snapshot.val()
                                } 
                                groupTemp = [...groupTemp, parsedGroup]
                            }
                            else {
                                console.log("No data available!")
                            }

                            if(user?.groups && user?.groups[user?.groups?.length - 1] === groupId) {
                                setGroups(groupTemp)
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
                            groups.length > 0 ? (
                                groups.filter(value => value.name.toLowerCase().includes(filter.toLowerCase()) || 
                                value.description.toLowerCase().includes(filter.toLowerCase()) || 
                                value.city.toLowerCase().includes(filter.toLowerCase())).map((value) => {
                                    return(
                                        <GroupCard key={value.id} group={value}/>
                                    )
                                })
                            ) : (
                                <p className={'default-message'}>Nenhum grupo encontrado. Comece criando o seu grupo ou entrando em um existente.</p>
                            )
                        }
                    </Container>
                )
            }
        </>
    )
}