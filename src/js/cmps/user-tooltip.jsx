import React from 'react'
import * as HoverCard from '@radix-ui/react-hover-card'
import { FiLogOut } from 'react-icons/fi'
import { AiOutlineUser } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/user/user.actions'
import { PublishLoginSignup } from '../pages/Editor/cmps/ui-cmps/publish-login'

export function UserTooltip({ user }) {
    async function onLogout() {
        try {
            await logout()
            showSuccessMsg('Logged out')
        } catch (err) {
            showErrorMsg('Logout failed')
        }
    }
    function countLeads() {
        if (!user.sites) return
        let count = 0
        user.sites.forEach(site => {
            count += site?.leadsBoards?.reduce((acc, board) => {
                acc += board?.items?.length || 0
                return acc
            }, 0)
        })
    }

    return (
        <HoverCard.Root openDelay={200}>
            <HoverCard.Trigger asChild>
                <div className='avatar'>{user ? user?.fullname[0] : <AiOutlineUser size={'70%'} fill={'#eee'} />}</div>
            </HoverCard.Trigger>
            <HoverCard.Portal>
                <HoverCard.Content className={`${!user ? 'guest' : ''} card-container HoverCardContent`} sideOffset={5}>
                    <div>
                        {user ? (
                            <>
                                <div className='flex column' style={{ gap: 10 }}>
                                    {user.imgUrl ? (
                                        <img className='user-img normal' src={user?.imgUrl} alt='userImg' />
                                    ) : (
                                        <div className='avatar'>
                                            <AiOutlineUser size={'70%'} fill={'#eee'} />
                                        </div>
                                    )}
                                    <div className='flex column'>
                                        <div>
                                            <div className='Text bold'>{user?.fullname}</div>
                                            <div className='Text faded'>@{user?.username}</div>
                                        </div>
                                        <div className='flex br-b' style={{ gap: 15 }}>
                                            <div className='flex' style={{ gap: 5 }}>
                                                <div className='Text bold'>{user?.sites?.length || 0}</div>{' '}
                                                <div className='Text faded'>Sites</div>
                                            </div>
                                            <div className='flex' style={{ gap: 5 }}>
                                                <div className='Text bold'>2,900</div>{' '}
                                                <div className='Text faded'>Subscribers</div>
                                            </div>
                                        </div>
                                        <div className='flex br-b' style={{ gap: 15 }}>
                                            <div className='flex' style={{ gap: 5 }}>
                                                <div className='Text bold'>2,900</div>{' '}
                                                <div className='Text faded'>Messages</div>
                                            </div>
                                            <div className='flex' style={{ gap: 5 }}>
                                                <div className='Text bold'>{countLeads()}</div>{' '}
                                                <div className='Text faded'>Leads</div>
                                            </div>
                                        </div>

                                        <div className='flex'>
                                            <Link className='bold-link' to={`/dashboard/${user._id}`}>
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
