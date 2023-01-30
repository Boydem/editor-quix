import { useEffect, useState } from 'react'
import { GoogleLogin } from 'react-google-login'
import { gapi } from 'gapi-script'
import { showErrorMsg } from '../../services/event-bus.service'

export function GoogleLoginSignup({ handleGoogleLogin }) {
    const clientId = '28399919732-osd9s038ajll6eq48pj8sce2cc0span8.apps.googleusercontent.com'

    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: '',
            })
        }
        gapi.load('client:auth2', initClient)
    }, [])

    function onLogin({ profileObj }) {
        const user = {
            username: profileObj.email,
            password: profileObj.googleId,
            fullname: profileObj.name,
            imgUrl: profileObj.imageUrl,
        }
        handleGoogleLogin(user)
    }
    function onGoogleLoginFailure(err) {
        showErrorMsg('Cannot login, try again later')
    }

    return (
        <>
            <GoogleLogin
                clientId={clientId}
                buttonText='Sign in with Google'
                onSuccess={onLogin}
                onFailure={onGoogleLoginFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={false}
            />
        </>
    )
}
