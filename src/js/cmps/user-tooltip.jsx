import React from 'react'
import * as HoverCard from '@radix-ui/react-hover-card'
import { FiLogOut } from 'react-icons/fi'
import { AiOutlineUser } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/user/user.actions'

export function UserTooltip({ user }) {
    function getShortenName() {
        if (!user) return
        const matches = user?.fullname.match(/\b(\w)/g)
        const shortName = matches.join('')
        return shortName
    }
    async function onLogout() {
        try {
            await logout()
            showSuccessMsg('Logged out')
        } catch (err) {
            showErrorMsg('Logout failed')
        }
    }
    return (
        <HoverCard.Root openDelay={200}>
            <HoverCard.Trigger asChild>
                <div className='avatar'>{user ? getShortenName() : <AiOutlineUser size={'70%'} fill={'#eee'} />}</div>
            </HoverCard.Trigger>
            <HoverCard.Portal>
                <HoverCard.Content className={`${!user ? 'guest' : ''} card-container HoverCardContent`} sideOffset={5}>
                    {user && <img className='user-img normal' src={user.imgUrl} alt='userImg' />}
                    <div>
                        <div className='text-container'>
                            <div className='text'>{user ? `Hi, ${user.fullname}` : 'Hello there !'}</div>
                        </div>
                        {user ? (
                            <>
                                <div>
                                    <Link className='btn-primary' to={`/dashboard/${user._id}`}>
                                        Admin panel
                                    </Link>
                                </div>
                                <div className='icon-container'>
                                    <button
                                        data-tooltip={'Logout'}
                                        data-tooltip-dir={'right'}
                                        className='logout-icon btn-icon'
                                        onClick={onLogout}
                                    >
                                        <FiLogOut />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className='login-signup-guest'>
                                <Link className='btn-primary sign-in' to='/auth/login'>
                                    <span>Login</span>
                                </Link>

                                <Link className='btn-secondary sign-up' to='/auth/login'>
                                    <span>Sign up</span>
                                </Link>
                            </div>
                        )}
                    </div>

                    <HoverCard.Arrow className='HoverCardArrow' />
                </HoverCard.Content>
            </HoverCard.Portal>
        </HoverCard.Root>
    )
}
