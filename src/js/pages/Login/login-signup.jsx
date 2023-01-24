import { useState } from 'react'
import { useNavigate } from 'react-router'
import { login, logout, signup, onGoogleLogin } from '../../store/user/user.actions'
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service'
import { AppHeader } from '../../cmps/app-header'
import { GoogleLoginSignup } from './google-login-signup'

export function LoginSignup({ onLogin, onSignup }) {
    const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '' })
    const [isSignup, setIsSignup] = useState(false)
    const navigate = useNavigate()

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

    async function onLogin(ev) {
        ev.preventDefault()
        try {
            const user = await login(credentials)
            showSuccessMsg(`Welcome back, ${user.fullname}`)
            console.log('credentials:', credentials)
        } catch (err) {
            console.error('Failed to login', err)
            showErrorMsg('Cannot login. Please try again later.')
        } finally {
            clearState()
            navigate(-1)
        }
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

    async function handleGoogleLogin(credentials) {
        try {
            const user = await onGoogleLogin(credentials)
            showSuccessMsg(`Welcome, ${user.fullname}`)
        } catch (err) {
            console.error('Failed to login', err)
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
        <>
            <AppHeader location={'auth'} theme={'dark'} layout={'main-layout'} />
            <div className='login-signup full main-layout'>
                <div className='wrapper'>
                    {isSignup ? (
                        <div className='signup-section'>
                            <h1>Sign Up</h1>
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
                            <div className='header'>
                                <h2>Log In</h2>
                                <p>
                                    Don't have an account ?{' '}
                                    <a className='toggle-link' href='#' onClick={toggleSignup}>
                                        Sign Up
                                    </a>
                                </p>
                            </div>
                            <div className='login-options-container'>
                                <form onSubmit={onLogin}>
                                    <label htmlFor='username'>Username</label>
                                    <input
                                        type='text'
                                        name='username'
                                        value={credentials.username}
                                        onChange={handleChange}
                                        required
                                    />
                                    <label htmlFor='username'>Password</label>
                                    <input
                                        type='password'
                                        name='password'
                                        value={credentials.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <button>Log In</button>
                                </form>
                                <div className='seperetor'>
                                    <div className='divider'></div>
                                    <span className='with-or'>or</span>
                                    <div className='divider'></div>
                                </div>
                                <div className='api-login'>
                                    <GoogleLoginSignup handleGoogleLogin={handleGoogleLogin} />
                                    <div className='api-login-btn'>Continue with Facebook</div>
                                </div>
                            </div>
                            <div className='footer'>
                                <div className='recaptcha'>
                                    <p>
                                        <a href='#'>Terms of Use</a> <a href='#'> Privacy Policy</a>
                                    </p>
                                    <p>
                                        This site is protected by reCAPTCHA Enterprise. Google's Privacy Policy and
                                        Terms of Use apply.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
