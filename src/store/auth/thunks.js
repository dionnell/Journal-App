import { signInWithGoogle, registerUser, loginwithEmailPassword, logoutFirebase } from "../../firebase/providers"
import { clearNotesLogout } from "../journal/journalSlice"
import { checkingCredentials, login, logout } from "./authSlice"


export const checkingAuthentication = ( email, password ) => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() )

    }
}

export const startGoogleSignIn = () => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() )
        
        const result = await signInWithGoogle()
        //console.log({result})
        if( !result.ok ) return dispatch( logout( result.errorMessage ) )

        dispatch( login( result ) )

    }
}

export const startCreatingUserWithEmailPessword = ({email, password, displayName}) => {

    return async( dispatch ) => {

        dispatch( checkingCredentials() )

        const { ok, uid, photoURL, errorMessage } = await registerUser({email, password, displayName})

        if( !ok ) return dispatch( logout( {errorMessage} ) )

        dispatch( login({ uid, displayName, email, photoURL }) )

    }
}

export const startLoginwithEmailPassword = ({ email, password }) => {

    return async( dispatch ) => {

        dispatch( checkingCredentials() )

        const result = await loginwithEmailPassword({ email, password })

        if( !result.ok ) return dispatch( logout( result ) )

        dispatch( login(result) )

    }

}

export const startLogout = () => {
    return async( dispatch ) => {

        await logoutFirebase ()

        dispatch(clearNotesLogout() )
        dispatch( logout({}) )

    }
}