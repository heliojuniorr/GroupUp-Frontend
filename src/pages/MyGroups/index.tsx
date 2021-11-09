import { useAuth } from "../../hooks/useAuth";
import { Container, GroupListItem } from "./styles";
import logoImg from '../../assets/logo.svg'
import { useHistory } from "react-router";
import { database, firebaseRef, firebaseSet } from "../../services/firebase"

export function MyGroups() {
    const { user } = useAuth()
    const history = useHistory()

    function handleGroupSelection() {
        history.push('/group/1')
        //const groupRef = firebaseRef(database, "group/")
        //firebaseSet(groupRef, {
        //    name: 'teste2'
        //})
    }

    return(
        <Container>
                {
                    user && (
                        <ul>
                            <li>
                                <GroupListItem onClick={handleGroupSelection}>
                                    <div>
                                        <div className="group-header">
                                            <p>Grupo de atividades legais</p>
                                            <p>Local: SP</p>
                                            <p>Membros: 12</p>
                                        </div> 
                                        <div className="group-description">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et odio lectus. Duis tortor quam, efficitur eget blandit ut, porttitor at elit. Pellentesque pharetra sem.</p>
                                        </div> 
                                    </div>
                                    <div>
                                        <img src={logoImg} alt="Imagem" />
                                    </div>
                                </GroupListItem>
                            </li>
                            <li>
                                <GroupListItem>
                                    <div>
                                        <div className="group-header">
                                            <p>Grupo de atividades legais</p>
                                            <p>Local: SP</p>
                                            <p>Membros: 12</p>
                                        </div> 
                                        <div className="group-description">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et odio lectus. Duis tortor quam, efficitur eget blandit ut, porttitor at elit. Pellentesque pharetra sem.</p>
                                        </div> 
                                    </div>
                                    <div>
                                        <img src={logoImg} alt="Imagem" />
                                    </div>
                                </GroupListItem>
                            </li>
                            <li>
                                <GroupListItem>
                                    <div>
                                        <div className="group-header">
                                            <p>Grupo de atividades legais</p>
                                            <p>Local: SP</p>
                                            <p>Membros: 12</p>
                                        </div> 
                                        <div className="group-description">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et odio lectus. Duis tortor quam, efficitur eget blandit ut, porttitor at elit. Pellentesque pharetra sem.</p>
                                        </div> 
                                    </div>
                                    <div>
                                        <img src={logoImg} alt="Imagem" />
                                    </div>
                                </GroupListItem>
                            </li>
                        </ul>
                    )
                }
            </Container>
    )
}