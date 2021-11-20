import { useAuth } from "../../hooks/useAuth"
import { MembersCardParams } from "../../interfaces/types"
import { MembersList, MembersListItem } from "./styles"
import logoImg from '../../assets/logo.svg'

export function MembersCard({members}: MembersCardParams) {
    const { user } = useAuth()

    return(
        <>
            {
                user && (
                    <MembersList>
                        <p>Membros</p>
                        <ul>
                            {
                                members.length > 0 ? (
                                    members.map((value, index) => {
                                        return(
                                            <MembersListItem key={index}>
                                                <div className="member-header">
                                                    <p>{value?.name}</p>
                                                </div> 
                                                <div>
                                                    <img src={logoImg} alt="Imagem" />
                                                </div>
                                            </MembersListItem>
                                        )
                                    })
                                ) : (
                                    <div>Seja o primeiro membro.</div>
                                )
                            }
                        </ul>
                    </MembersList>
                )
            }
        </>
    )
}