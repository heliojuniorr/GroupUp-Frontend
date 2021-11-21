import { useHistory } from "react-router"
import { useAuth } from "../../hooks/useAuth"
import { GroupCardParams, iconImages } from "../../interfaces/types"
import { Container, GroupListItem } from "./styles"

export function GroupCard({ group, disabled = false }: GroupCardParams) {
    const { user } = useAuth()
    const history = useHistory()

    function handleGroupSelection(id: string) {
        !disabled && history.push('group/' + id)
    }

    return(
        <>
            {
                user && (
                    <Container>
                        <GroupListItem disabled={disabled} onClick={() => {handleGroupSelection(group.id)}}>
                            <div>
                                <div className="group-header">
                                    <p>{group.name}</p>
                                    <p>Local: {group.city}</p>
                                    <p>Membros: {group.members?.length}</p>
                                </div> 
                                <div className="group-description">
                                    <p>{group.description}</p>
                                </div> 
                            </div>
                            <div>
                                {/*@ts-ignore*/}
                                <img src={iconImages[group.image]} alt="Ícone"/>
                            </div> 
                        </GroupListItem>
                    </Container>
                )
            }
        </>
    )
}