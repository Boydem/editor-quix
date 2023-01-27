import React from 'react'
import * as HoverCard from '@radix-ui/react-hover-card'
import { FiLogOut } from 'react-icons/fi'
import { AiOutlineUser } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/user/user.actions'
import { PublishLoginSignup } from '../pages/Editor/cmps/ui-cmps/publish-login'

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
                    <div>
                        {user ? (
                            <>
                                {/* <div className='text-container'>
                                    <div className='text'>Hi, {user.fullname}</div>
                                </div>
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
                                </div> */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                                    {user && <img className='user-img normal' src={user.imgUrl} alt='userImg' />}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                                        <div>
                                            <div className='Text bold'>{user.fullname}</div>
                                            <div className='Text faded'>@{user.username}</div>
                                        </div>
                                        <div className='Text'>
                                            Components, icons, colors, and templates for building high-quality,
                                            accessible UI. Free and open-source.
                                        </div>
                                        <div style={{ display: 'flex', gap: 15 }}>
                                            <Link className='btn-primary' to={`/dashboard/${user._id}`}>
                                                Admin panel
                                            </Link>
                                        </div>
                                    </div>
                                    <div className='icon-container'>
                                        <button
                                            data-tooltip={'Logout'}
                                            data-tooltip-dir={'left'}
                                            className='logout-icon btn-icon'
                                            onClick={onLogout}
                                        >
                                            <FiLogOut />
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <PublishLoginSignup />
                        )}
                    </div>

                    <HoverCard.Arrow className='HoverCardArrow' />
                </HoverCard.Content>
            </HoverCard.Portal>
        </HoverCard.Root>
    )
}
