import { loginwithEmailPassword, logoutFirebase, signInWithGoogle } from "../../../src/firebase/providers"
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice"
import { checkingAuthentication, startGoogleSignIn, startLoginwithEmailPassword, startLogout } from "../../../src/store/auth/thunks"
import { clearNotesLogout } from "../../../src/store/journal/journalSlice"
import { demoUser } from "../../helpers/fixtures/authFixtures"

jest.mock('../../../src/firebase/providers')

describe('pruebas en auth thunks', () => { 

    const dispatch = jest.fn()
    beforeEach( () => jest.clearAllMocks() )

    test('debe de invocar el chekingCredentials', async() => { 
        
        await checkingAuthentication()(dispatch)
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )
     })

    test('startGoogleSignIn debe de llamar el chekingCredentialsy login', async() => { 
       
       const loginData = { ok: true, ...demoUser }
       await signInWithGoogle.mockResolvedValue( loginData )

       await startGoogleSignIn()(dispatch)

       expect(dispatch).toHaveBeenLastCalledWith( checkingCredentials() )
       expect(dispatch).toHaveBeenLastCalledWith( login(loginData) )

     })

    test('startGoogleSignIn debe de llamar el chekingCredentials y logout - Error', async() => { 
      
      const loginData = { ok: false, errorMessage: 'Error' }
      await signInWithGoogle.mockResolvedValue( loginData )

      await startGoogleSignIn()(dispatch)

      expect(dispatch).toHaveBeenLastCalledWith( checkingCredentials() )
      expect(dispatch).toHaveBeenLastCalledWith( logout(loginData.errorMessage) )

    })

    test('startLoginwithEmailPassword debe de llamar chekingCredentials y login', async() => { 
      
      const loginData = { ok: true, ...demoUser }
      const formData = { email: demoUser.email, password:'1234567' }

      await loginwithEmailPassword.mockResolvedValue( loginData )

      await startLoginwithEmailPassword(formData)(dispatch)

      expect(dispatch).toHaveBeenLastCalledWith( checkingCredentials() )
      expect(dispatch).toHaveBeenLastCalledWith( login( loginData ) )

    })
    
    test('startLogout debe de llamar logoutFirebase y logout', async() => { 
      
        await startLogout()(dispatch)
  
        expect(logoutFirebase).toHaveBeenLastCalledWith()
        expect(dispatch).toHaveBeenLastCalledWith( clearNotesLogout() )
        expect(dispatch).toHaveBeenLastCalledWith( logout() )

  
      })


 })