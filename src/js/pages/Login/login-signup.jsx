import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import GoogleLogin from 'react-google-login'
import { gapi } from 'gapi-script'
import { login, logout, signup } from '../../store/user/user.actions'
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service'

export function LoginSignup({ onLogin, onSignup }) {
    const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '' })
    const [isSignup, setIsSignup] = useState(false)
    const navigate = useNavigate()
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

    function clearState() {
        setCredentials({ username: '', password: '', fullname: '', imgUrl: '' })
        setIsSignup(false)
    }

    function toggleSignup() {
        setIsSignup(!isSignup)
    }

    function handleChange({ target }) {
        const { name: field, value } = target
        setCredentials({ ...credentials, [field]: value })
    }

    async function onLogin(ev, credentials) {
        if (ev) ev.preventDefault()
        try {
            const user = await login(credentials)
            showSuccessMsg(`Welcome back, ${user.fullname}`)
        } catch (err) {
            console.error('Failed to login', err)
            showErrorMsg('Cannot login. Please try again later.')
        } finally {
            clearState()
            navigate('/')
        }
    }

    function onGoogleLogin({ profileObj }) {
        const user = {
            username: profileObj.email,
            password: profileObj.googleId,
            fullname: profileObj.name,
            imgUrl: profileObj.imageUrl,
        }
        onLogin(user)
    }
    function onGoogleLoginFailure(err) {
        console.log('failed:', err)
        showErrorMsg('Cannot login, try again later')
    }

    async function onSignup(ev) {
        ev.preventDefault()
        try {
            const user = await signup(credentials)
            showSuccessMsg(`Welcome, ${user.fullname}`)
        } catch (err) {
            console.error('Failed to signup', err)
            showErrorMsg('Cannot login. Please try again later.')
        } finally {
            clearState()
            navigate('/')
        }
    }

    async function onLogout() {
        try {
            await logout()
            showSuccessMsg('Come back soon')
        } catch (err) {
            console.error('Failed to logout', err)
            showErrorMsg('Cannot logout, try again later')
        }
    }

    return (
        <div className='login-signup'>
            {isSignup ? (
                <div className='signup-section'>
                    <h2>Sign Up</h2>
                    <span>Already a member?</span>
                    <button onClick={toggleSignup}>Log In</button>
                    <form onSubmit={onSignup}>
                        <input
                            type='text'
                            name='username'
                            value={credentials.username}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type='password'
                            name='password'
                            value={credentials.password}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type='text'
                            name='fullname'
                            value={credentials.fullname}
                            onChange={handleChange}
                            required
                        />
                        <button>Sign Up</button>
                    </form>
                </div>
            ) : (
                <div className='login-section'>
                    <h2>Log In</h2>
                    <span>Don't have an account ?</span>
                    <button onClick={toggleSignup}>Sign Up</button>
                    <form onSubmit={ev => onLogin(ev, credentials)}>
                        <input
                            type='text'
                            name='username'
                            value={credentials.username}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type='password'
                            name='password'
                            value={credentials.password}
                            onChange={handleChange}
                            required
                        />
                        <button>Log In</button>
                    </form>
                </div>
            )}

            <GoogleLogin
                clientId={clientId}
                buttonText='Sign in with Google'
                onSuccess={onGoogleLogin}
                onFailure={onGoogleLoginFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    )
}
