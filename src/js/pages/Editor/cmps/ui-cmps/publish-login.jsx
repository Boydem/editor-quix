import React, { useState } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { login, signup } from '../../../../store/user/user.actions'
import { showErrorMsg, showSuccessMsg } from '../../../../services/event-bus.service'

export function PublishLoginSignup() {
    const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '' })

    function clearState() {
        setCredentials({ username: '', password: '', fullname: '', imgUrl: '' })
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
            clearState()
        } catch (err) {
            console.error('Failed to login', err)
            showErrorMsg(err.txt)
        }
    }
    async function onSignup(ev) {
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
                <p className='Text'>Make changes to your account here. Click save when you're done.</p>
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
                <div style={{ display: 'flex', marginTop: 20, justifyContent: 'flex-end' }}>
                    <button className='Button green' onClick={onLogin}>
                        Login
                    </button>
                </div>
            </Tabs.Content>
            <Tabs.Content className='TabsContent' value='tab2'>
                <p className='Text'>Change your password here. After saving, you'll be logged out.</p>
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
                <div style={{ display: 'flex', marginTop: 20, justifyContent: 'flex-end' }}>
                    <button className='Button green' onClick={onSignup}>
                        Sign Up
                    </button>
                </div>
            </Tabs.Content>
        </Tabs.Root>
    )
}
