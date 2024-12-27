import { Button } from 'flowbite-react'
import React from 'react'
import { AiFillGooglePlusCircle } from 'react-icons/ai'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '~/firebase/firebase'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '~/redux/user/userSlice'
import { useNavigate } from 'react-router-dom'
import { googleAuthApi } from '~/apis'


function OAuth() {
    const auth = getAuth(app)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider()
        //ask user to select account
        provider.setCustomParameters({ prompt: 'select_account' })
        try {
            const result = await signInWithPopup(auth, provider)
            console.log(result)
            const GoogleUser = {name: result.user.displayName, email: result.user.email, profilePicture: result.user.photoURL}
            if (GoogleUser) {
                const googleAuth = await googleAuthApi(GoogleUser)
                console.log('googleAuth', googleAuth)
                dispatch(signInSuccess(googleAuth))
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Button type='button' outline gradientDuoTone='pinkToOrange' className='w-full mt-4' onClick={handleGoogleClick} >
            <AiFillGooglePlusCircle className='w-6 h-6 mr-2' />
            Continue with Google
        </Button>
    )
}

export default OAuth