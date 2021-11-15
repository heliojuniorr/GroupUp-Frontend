import { Container } from "./styles";

import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { database, firebaseRef, firebaseChild, firebaseGet } from "../../../services/firebase"
import { GroupType, FirebaseGroupsType } from "../../../interfaces/types"
import { GroupCard } from "../../../components/GroupCard";

export function GroupList() {
    const { user } = useAuth()
    const [groups, setGroups] = useState<GroupType[]>([] as GroupType[])

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
                            members: value.members
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
                        {
                            groups?.map((value) => {
                                return(
                                    <GroupCard group={value}/>
                                )
                            })
                        }
                    </Container>
                )
            }
        </>
    )
}