import { useAuth } from "../../hooks/useAuth";
import { Container, GroupListItem } from "./styles";
import logoImg from '../../assets/logo.svg'
import { useHistory } from "react-router";
import { database, firebaseRef, firebaseChild, firebaseGet } from "../../services/firebase"
import { useEffect, useState } from "react";
import { FirebaseUserType, GroupType, UserType } from "../../interfaces/types";

export function MyGroups() {
    const { user } = useAuth()
    const history = useHistory()
    const [groups, setGroups] = useState<GroupType[]>([] as GroupType[])

    function handleGroupSelection(id: string) {
        history.push('/group/' + id)
    }

    useEffect(() => {
        if(user) {
            const dbRef = firebaseRef(database)
            firebaseGet(firebaseChild(dbRef, "users/" + user.id)).then((snapshot) => {
                if(snapshot.exists()) {
                    const user: UserType = snapshot.val()

                    user?.groups?.forEach((groupId) => {
                        firebaseGet(firebaseChild(dbRef, "groups/" + groupId)).then((snapshot) => {
                            if(snapshot.exists()) {
                                const parsedGroup: GroupType = {
                                    id: groupId,
                                    ...snapshot.val()
                                } 
                                setGroups([
                                    ...groups,
                                    parsedGroup
                                ])
                            }
                            else {
                                console.log("No data available!")
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
                        <ul>
                                {
                                    groups.map((value) => {
                                        return(
                                            <li>
                                                <GroupListItem onClick={() => {handleGroupSelection(value.id)}}>
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
                                        </li>
                                        )
                                    })
                                }
                        </ul>
                    )
                }
            </Container>
    )
}