import { useEffect, useState } from 'react'
import { BsFillMoonStarsFill } from 'react-icons/bs'
import { FaBars } from 'react-icons/fa'
import { Link } from 'react-router-dom'
export function HomeHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState()

    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen)
    }
    return (
        <header className='home-header flex justify-between full'>
            <span className='logo'>Webix.</span>
            <div onClick={toggleMenu} className='btn-mobile-menu'>
                <FaBars />
            </div>
            <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
                <ul className='flex align-center'>
                    <li>
                        <Link className='nav-link link-underline' to='/edit'>
                            <span>Home</span>
                        </Link>
                    </li>
                    <li>
                        <a className='nav-link link-underline' href='#'>
                            <span>About Us</span>
                        </a>
                    </li>
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
