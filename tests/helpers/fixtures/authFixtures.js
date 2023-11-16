
export const initialState = {
    status:'ckecking', // 'ckecking', 'autenticated'
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
}

export const authenticatedState = {
    status:'autenticated', // 'ckecking', 'autenticated'
    uid: '1234sdg',
    email: 'demo@gmail.com',
    displayName: 'demo',
    photoURL: 'https://demo.jpg',
    errorMessage: null,
}

export const notAuthenticatedState = {
    status:'not-autenticated', // 'ckecking', 'autenticated'
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
}

export const demoUser ={
    uid: '1234sdg',
    email: 'demo@gmail.com',
    displayName: 'demo',
    photoURL: 'https://demo.jpg',
}