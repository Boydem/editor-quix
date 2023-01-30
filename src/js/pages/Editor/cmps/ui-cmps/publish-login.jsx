import React, { useState } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { login, onGoogleLogin, signup } from '../../../../store/user/user.actions'
import { showErrorMsg, showSuccessMsg } from '../../../../services/event-bus.service'
import { GoogleLoginSignup } from '../../../Login/google-login-signup'
import { useNavigate } from 'react-router'

export function PublishLoginSignup() {
    const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '' })
    const navigate = useNavigate()
    function clearState() {
        setCredentials({ username: '', password: '', fullname: '', imgUrl: '' })
    }

    function handleChange({ target }) {
        const { name: field, value } = target
        setCredentials({ ...credentials, [field]: value })
    }

    async function onLogin(ev) {
        if (!credentials.username || !credentials.password) {
            showErrorMsg('Please fill all forms!')
            return
        }
        ev.preventDefault()
        try {
            const user = await login(credentials)
            showSuccessMsg(`Welcome back, ${user.fullname}`)
            clearState()
        } catch (err) {
            console.error('Failed to login', err)
            showErrorMsg(err.txt)
        }
    }
    async function onSignup(ev) {
        if (!credentials.username || !credentials.password || !credentials.fullname) {
            showErrorMsg('Please fill all forms!')
            return
        }
        ev.preventDefault()
        try {
            const user = await signup(credentials)
            showSuccessMsg(`Welcome, ${user.fullname}`)
            clearState()
        } catch (err) {
            console.error('Failed to signup', err)
            showErrorMsg(err.txt)
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
            navigate(-1)
        }
    }

    return (
        <Tabs.Root className='TabsRoot' defaultValue='tab1'>
            <Tabs.List className='TabsList' aria-label='Manage your account'>
                <Tabs.Trigger className='TabsTrigger' value='tab1'>
                    Login
                </Tabs.Trigger>
                <Tabs.Trigger className='TabsTrigger' value='tab2'>
                    Sign Up
                </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content className='TabsContent' value='tab1'>
                <fieldset className='Fieldset'>
                    <label className='Label' htmlFor='name'>
                        Username
                    </label>
                    <input
                        className='Input'
                        id='name'
                        name='username'
                        placeholder='Your username'
                        value={credentials.username}
                        onChange={handleChange}
                    />
                </fieldset>
                <fieldset className='Fieldset'>
                    <label className='Label' htmlFor='username'>
                        Password
                    </label>
                    <input
                        className='Input'
                        id='username'
                        name='password'
                        placeholder='Your password'
                        value={credentials.password}
                        onChange={handleChange}
                    />
                </fieldset>
                <div className='login-btns flex justify-between align-center'>
                    <GoogleLoginSignup handleGoogleLogin={handleGoogleLogin} />
                    <button className='login-btn' onClick={onLogin}>
                        Login
                    </button>
                </div>
            </Tabs.Content>
            <Tabs.Content className='TabsContent' value='tab2'>
                <fieldset className='Fieldset'>
                    <label className='Label' htmlFor='username'>
                        Username
                    </label>
                    <input
                        className='Input'
                        id='username'
                        name='username'
                        type='username'
                        onChange={handleChange}
                        value={credentials.username}
                    />
                </fieldset>
                <fieldset className='Fieldset'>
                    <label className='Label' htmlFor='password'>
                        Password
                    </label>
                    <input
                        className='Input'
                        id='password'
                        name='password'
                        type='password'
                        onChange={handleChange}
                        value={credentials.password}
                    />
                </fieldset>
                <fieldset className='Fieldset'>
                    <label className='Label' htmlFor='fullname'>
                        Full Name
                    </label>
                    <input
                        className='Input'
                        id='fullname'
                        name='fullname'
                        type='text'
                        onChange={handleChange}
                        value={credentials.fullname}
                    />
                </fieldset>
                <div className='login-btns flex justify-end align-center'>
                    <button className='login-btn' onClick={onSignup}>
                        Sign Up
                    </button>
                </div>
            </Tabs.Content>
        </Tabs.Root>
    )
}
