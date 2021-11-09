import { Container, GroupListItem } from "./styles";

import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import logoImg from '../../assets/logo.svg'
import { database, firebaseRef, firebaseChild, firebaseGet } from "../../services/firebase"
import { GroupType, FirebaseGroupsType } from "../../interfaces/types"

export function GroupList() {
    const { user } = useAuth()
    const history = useHistory()
    const [groups, setGroups] = useState<GroupType[]>([] as GroupType[])


    function handleClick(id: string) {
        history.push('group/' + id)
    }

    useEffect(() => {
        if(!user) {
            history.push('/')
            return
        }
        else {
            const groupRef = firebaseRef(database)
            firebaseGet(firebaseChild(groupRef, "group/")).then((snapshot) => {
                if(snapshot.exists()) {
                    const firebaseGroups: FirebaseGroupsType = snapshot.val()
                    const parsedGroup: GroupType[] = Object.entries(firebaseGroups).map(([key, value]) => {
                        return{
                            id: key,
                            name: value.name,
                            description: value.description,
                            city: value.city
                        }
                    })
                    setGroups(parsedGroup)
                }
                else {
                    console.log("No data available!")
                }
            }).catch(error => console.error(error))
        }
    }, [])

    return(
        <>
            <Container>
                {
                    user && (
                        <ul>
                            <li>
                                {
                                    groups?.map((value) => {
                                        return(
                                            <GroupListItem onClick={() => {handleClick(value.id)}}>
                                               <div>
                                                    <div className="group-header">
                                                        <p>{value.name}</p>
                                                        <p>Local: {value.city}</p>
                                                        <p>Membros: 12</p>
                                                    </div> 
                                                    <div className="group-description">
                                                        <p>{value.description}</p>
                                                    </div> 
                                                </div>
                                                <div>
                                                    <img src={logoImg} alt="Imagem" />
                                                </div> 
                                            </GroupListItem>
                                        )
                                    })
                                }
                            </li>
                        </ul>
                    )
                }
            </Container>
        </>
    )
}