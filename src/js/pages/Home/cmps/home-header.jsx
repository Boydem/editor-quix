import { useEffect, useState } from 'react'
import { BsFillMoonStarsFill } from 'react-icons/bs'
import { FaBars } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { QuixLogo } from '../../../cmps/quix-logo'
import { UserTooltip } from '../../../cmps/user-tooltip'
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service'
import { logout } from '../../../store/user/user.actions'
export function HomeHeader() {
    const user = useSelector(storeState => storeState.userModule.user)

    return (
        <header className='home-header flex justify-between full'>
            <div className='logo-container'>
                <Link to='/' className='logo'>
                    <QuixLogo />
                </Link>
            </div>

            <nav className={`main-nav`}>
                <ul className='flex align-center'>
                    <li>
                        <Link className='nav-link btn-start-now link-underline' to='/create'>
                            <span>Start Now</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
