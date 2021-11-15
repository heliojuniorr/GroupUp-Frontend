import { useEffect } from "react"
import { useHistory } from "react-router";
import { useAuth } from "../../hooks/useAuth";

export function LogOut() {
    const { signOutWithGoogle } = useAuth()
    const history = useHistory()

useEffect(() => {
    signOutWithGoogle().then(() => {
        history.push('/')
        document.location.reload()
        //TODO
    })
})

    return(
        <h1>Saindo...</h1>  
    )
}