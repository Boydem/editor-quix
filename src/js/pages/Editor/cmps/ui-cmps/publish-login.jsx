import React from 'react'
import * as Tabs from '@radix-ui/react-tabs'

export function PublishLoginSignup() {
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
                    <input className='Input' id='name' defaultValue='Pedro Duarte' />
                </fieldset>
                <fieldset className='Fieldset'>
                    <label className='Label' htmlFor='username'>
                        Password
                    </label>
                    <input className='Input' id='username' defaultValue='@peduarte' />
                </fieldset>
                <div style={{ display: 'flex', marginTop: 20, justifyContent: 'flex-end' }}>
                    <button className='Button green'>Login</button>
                </div>
            </Tabs.Content>
            <Tabs.Content className='TabsContent' value='tab2'>
                <p className='Text'>Change your password here. After saving, you'll be logged out.</p>
                <fieldset className='Fieldset'>
                    <label className='Label' htmlFor='currentPassword'>
                        Full Name
                    </label>
                    <input className='Input' id='currentPassword' type='password' />
                </fieldset>
                <fieldset className='Fieldset'>
                    <label className='Label' htmlFor='newPassword'>
                        User Name
                    </label>
                    <input className='Input' id='newPassword' type='password' />
                </fieldset>
                <fieldset className='Fieldset'>
                    <label className='Label' htmlFor='confirmPassword'>
                        Password
                    </label>
                    <input className='Input' id='confirmPassword' type='password' />
                </fieldset>
                <div style={{ display: 'flex', marginTop: 20, justifyContent: 'flex-end' }}>
                    <button className='Button green'>Sign Up</button>
                </div>
            </Tabs.Content>
        </Tabs.Root>
    )
}
