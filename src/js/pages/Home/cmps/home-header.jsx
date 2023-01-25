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
    const [isMenuOpen, setIsMenuOpen] = useState()

    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <header className='home-header flex justify-between full'>
            <div className='logo-container'>
                <Link to='/' className='logo'>
                    <QuixLogo />
                </Link>
            </div>

            <div onClick={toggleMenu} className='btn-mobile-menu'>
                <FaBars />
            </div>
            <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
                <ul className='flex align-center'>
                    <div className='user-area'>
                        <UserTooltip user={user} />
                    </div>
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
