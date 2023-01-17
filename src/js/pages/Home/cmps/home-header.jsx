import { useEffect, useState } from 'react'
import { BsFillMoonStarsFill } from 'react-icons/bs'
import { FaBars } from 'react-icons/fa'
export function AppHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState()

    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen)
    }
    return (
        <header className='app-header flex justify-between full'>
            <span className='logo'>WinX</span>
            <div onClick={toggleMenu} className='btn-mobile-menu'>
                <FaBars />
            </div>
            <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
                <ul className='flex align-center'>
                    <li>
                        <a className='nav-link link-underline' href='#'>
                            <span>Home</span>
                        </a>
                    </li>
                    <li>
                        <a className='nav-link link-underline' href='#'>
                            <span>About Us</span>
                        </a>
                    </li>
                    <li>
                        <a className='nav-link btn-start-now link-underline' href='#'>
                            <span>Start Now</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
