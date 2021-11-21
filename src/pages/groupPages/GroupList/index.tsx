import { Container } from "./styles";

import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { database, firebaseRef, firebaseChild, firebaseGet } from "../../../services/firebase"
import { GroupType, FirebaseGroupsType } from "../../../interfaces/types"
import { GroupCard } from "../../../components/GroupCard";
import { TextField } from "@mui/material";

export function GroupList() {
    const { user } = useAuth()
    const [groups, setGroups] = useState<GroupType[]>([] as GroupType[])
    const [filter, setFilter] = useState('')

    useEffect(() => {
        if(user) {
            const groupRef = firebaseRef(database)
            firebaseGet(firebaseChild(groupRef, "groups/")).then((snapshot) => {
                if(snapshot.exists()) {
                    const firebaseGroups: FirebaseGroupsType = snapshot.val()
                    const parsedGroup: GroupType[] = Object.entries(firebaseGroups).map(([key, value]) => {
                        return{
                            id: key,
                            authorId: value.authorId,
                            name: value.name,
                            description: value.description,
                            city: value.city,
                            members: value.members,
                            image: value.image
                        }
                    })
                    setGroups(parsedGroup)
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
                                <p className={'default-message'}>Nenhum grupo encontrado. Comece criando o seu grupo agora mesmo.</p>
                            )
                        }
                    </Container>
                )
            }
        </>
    )
}