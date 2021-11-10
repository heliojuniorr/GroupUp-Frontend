import { createContext, ReactNode, useEffect, useState } from "react"
import { useHistory } from "react-router"
import { GoogleAuthProvider, signInWithRedirect, getAuth, getRedirectResult, onAuthStateChanged } from "../services/firebase"

type User = {
    id: string ;
    name: string;
}
  
type AuthContextType = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider(props: AuthContextProviderProps) {
    const [user, setUser] = useState<User>()
    const auth = getAuth()
    const history = useHistory()

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const { displayName, uid } = user
          if(!displayName) {
            throw new Error('Missing information from Google account.')
          }
          setUser({
            id: uid,
            name: displayName,
          })
          if(history.location.pathname === '/') {
            history.push('/mygroups')
          }
        }
      })
  
      return () => {
        unsubscribe();
      }
    }, [])
  
    async function signInWithGoogle() {
        const provider = new GoogleAuthProvider()
        const auth = getAuth()
  
        signInWithRedirect(auth, provider)
        getRedirectResult(auth).then((result) => {
            if(result?.user) {
                //const credential = GoogleAuthProvider.credentialFromResult(result);
                //const token = credential?.accessToken;
                //console.log(token)
                const { displayName, uid } = result.user
                if(!displayName) {
                    throw new Error('Missing information from Google account.')
                }
                setUser({
                    id: uid,
                    name: displayName,
                })
                if(history.location.pathname === '/') {
                  history.push('/mygroups')
                }
            }
        }).catch((error) => {
            //const errorCode = error.code;
            //const errorMessage = error.message;
            //const email = error.email;
            //const credential = GoogleAuthProvider.credentialFromError(error);
        });
    }

    return (
        <AuthContext.Provider value={{user, signInWithGoogle}}>
            {props.children}
        </AuthContext.Provider>

    )
}