import { fireEvent, render, screen } from "@testing-library/react"
import { LoginPage } from "../../../src/auth/pages/LoginPage"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import { authSlice } from "../../../src/store/auth"
import { startGoogleSignIn } from "../../../src/store/auth/thunks"

import { MemoryRouter } from "react-router-dom"
import { notAuthenticatedState } from "../../helpers/fixtures/authFixtures"



const MockStartGoogleSignIn = jest.fn()
const MockStartLoginwithEmailPassword = jest.fn()

jest.mock('../../../src/store/auth/thunks', () => ({
    startGoogleSignIn: () => MockStartGoogleSignIn,
    startLoginwithEmailPassword: ({ email, password }) => {
        return () => MockStartLoginwithEmailPassword({ email, password })
    },
}) )

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => (fn) => fn(), 
}))

const store = configureStore({
    reducer:{
        auth: authSlice.reducer
    },
    preloadedState:{
        auth: notAuthenticatedState
    }

})



describe('pruebas en loginpage', () => { 
    
    beforeEach( () => jest.clearAllMocks() )

    test('debe mostrar que el componente se renderice', () => { 
        
        render(
            <Provider store={ store } >
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        )

        //screen.debug()
        expect( screen.getAllByText('Login').length ).toBeGreaterThanOrEqual(1)

     })

    test('boton de google debe de llamar al startGoogleSignIn', () => { 
       
        render(
            <Provider store={ store } >
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        )

        const googleBtn = screen.getByLabelText('google-btn')
        fireEvent.click( googleBtn )
        expect(MockStartGoogleSignIn).toHaveBeenCalled()

    })

    test('submit debe de llamar el startLoginwithEmailPassword', () => { 
        
        const email = 'test@google.com'
        const password = '123456'

        render(
            <Provider store={ store } >
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        )

        const emailField = screen.getByRole('textbox', { name: 'Correo' })
        fireEvent.change( emailField, { target: { name: 'email', value: email } } )

        const passwordField = screen.getByTestId('password')
        fireEvent.change( passwordField, { target: { name: 'password', value: password } } )

        const loginForm = screen.getByLabelText('submit-form')
        fireEvent.submit( loginForm )

        expect( MockStartLoginwithEmailPassword ).toHaveBeenCalledWith({
            email: email,
            password: password
        })

     })

 })