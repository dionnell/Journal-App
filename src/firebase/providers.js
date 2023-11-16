import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { firebaseAuth } from "./config";


const googleProvider = new GoogleAuthProvider()

export const signInWithGoogle = async() => {

    try {
        
        const result = await signInWithPopup( firebaseAuth, googleProvider )
        //const credentials = GoogleAuthProvider.credentialFromResult( result )
        const { displayName, email, photoURL, uid } = result.user
        //console.log({user})

        return{
            ok: true,
            //info user
            displayName, email, photoURL, uid
        }

    } catch (error) {

        const errorCode = error.code
        const errorMessage = error.message

        return {
            ok:false,
            errorCode,
            errorMessage
        }
    }

}

export const registerUser = async({ email, password, displayName }) => {
    try {
        
        const resp = await createUserWithEmailAndPassword(firebaseAuth, email, password)
        const { uid, photoURL } = resp.user

        //Actualizar el displayName en Firebase
        await updateProfile( firebaseAuth.currentUser, { displayName } )

        return{
            ok: true,
            uid, photoURL, email, displayName
        }

    } catch (error) {
        //console.log(error)
        return { ok:false, errorMessage: error.message }
    }
} 

export const loginwithEmailPassword = async({ email, password }) => {

    try {
        const resp = await signInWithEmailAndPassword( firebaseAuth, email, password )
        const { uid, photoURL, displayName } = resp.user
        
        return {
            ok: true,
            uid, photoURL, displayName
        }

    } catch (error) {
        //console.log(error)
        return { ok:false, errorMessage: error.message }
    }
    
}

export const logoutFirebase = async() => {

    return await firebaseAuth.signOut()

}