import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite"
import { FirebaseBD } from "../../firebase/config"
import { UpdateNotes, addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving } from "./journalSlice"
import { fileUpload, loadNotes } from "../../helpers"

export const startNewNote = () => {

    return async ( dispatch, getState ) => {

        dispatch( addNewEmptyNote( savingNewNote() ) )
        const { uid } = getState().auth

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const newDoc = doc( collection( FirebaseBD, `${ uid }/journal/notes` ) )
        await setDoc( newDoc, newNote )

        newNote.id = newDoc.id

        //dispatch
        dispatch( addNewEmptyNote( newNote ) )
        dispatch( setActiveNote( newNote ) )

    }

}

export const startLoadingNotes = () => {
    return async( dispatch, getState ) => {
        const { uid } = getState().auth

        const notes = await loadNotes(uid)
        dispatch( setNotes( notes ) )

    }
}

export const startSaveNote = () => {
    return async ( dispatch, getState ) => {
        
        dispatch( setSaving() )

        const { uid } = getState().auth
        const { active:note } = getState().journal 

        const noteToFireStore = { ...note }
        delete noteToFireStore.id

        const docRef = doc(FirebaseBD, `${uid}/journal/notes/${note.id}`)
        await setDoc( docRef, noteToFireStore, { merge: true } )

        dispatch(UpdateNotes(note))

    }
}

export const startUploadingFiles = ( files=[] ) => {
    return async (dispatch) => {

        dispatch(setSaving())

        //await fileUpload( files[0] )
        const fileUploadPromises = []
        for ( const file of files ) {
            fileUploadPromises.push( fileUpload(file) )
            
        }

        const photosUrls = await Promise.all( fileUploadPromises )

        dispatch(setPhotosToActiveNote(photosUrls))

    }
}

export const startDeletingNote = () => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth
        const { active: note } = getState().journal

        const DocRef = doc( FirebaseBD, `${uid}/journal/notes/${note.id}` )
        await deleteDoc( DocRef )

        dispatch(deleteNoteById(note.id))

    }
}