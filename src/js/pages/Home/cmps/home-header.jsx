import { useEffect, useState } from 'react'
import { BsFillMoonStarsFill } from 'react-icons/bs'
import { FaBars } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service'
import { logout } from '../../../store/user/user.actions'
export function HomeHeader() {
    const user = useSelector(storeState => storeState.userModule.user)
    const [isMenuOpen, setIsMenuOpen] = useState()

    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen)
    }

    async function onLogout() {
        try {
            await logout()
            showSuccessMsg('Logged out')
        } catch (err) {
            showErrorMsg('Logout failed')
        }
    }

    function getShortenName() {
        if (!user) return
        const matches = user?.fullname.match(/\b(\w)/g)
        const shortName = matches.join('')
        console.log('shortName:', shortName)
        return shortName
    }
    console.log('user:', user)

    return (
        <header className='home-header flex justify-between full'>
            <Link to='/' className='logo'>
                Webix.
            </Link>
            <div onClick={toggleMenu} className='btn-mobile-menu'>
                <FaBars />
            </div>
            <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
                {user ? (
                    <ul className='flex align-center'>
                        <div className='user-area'>
                            <div className='avatar'>
                                {getShortenName()}
                                {/* <img src={user.imgUrl} alt='userAvatar' /> */}
                            </div>
                            <div className='user-info'>
                                <div className='user-fullname'>{user.fullname}</div>
                                <div className='user-links'>
                                    <>
                                        <Link className='btn-dashboard' to={`/dashboard/${user._id}`}>
                                            Dashboard
                                        </Link>
                                        <span className='btn-logout' onClick={onLogout}>
                                            Logout
                                        </span>
                                    </>
                                </div>
                            </div>
                        </div>
                        <li>
                            <Link className='nav-link btn-start-now link-underline' to='/create'>
                                <span>Start Now</span>
                            </Link>
                        </li>
                    </ul>
                ) : (
                    <ul className='flex align-center'>
                        <li>
                            <Link className='nav-link link-underline sign-in' to={'/auth/login'}>
                                <span>Login</span>
                            </Link>
                        </li>
                        <li>
                            <Link className='nav-link link-underline sign-up' to={'/auth/signup'}>
                                <span>Sign up</span>
                            </Link>
                        </li>
                        <li>
                            <Link className='nav-link btn-start-now link-underline' to='/create'>
                                <span>Start Now</span>
                            </Link>
                        </li>
                    </ul>
                )}
            </nav>
        </header>
    )
}
