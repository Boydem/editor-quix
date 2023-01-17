import { useEffect, useState } from 'react'
import { BsFillMoonStarsFill } from 'react-icons/bs'
import { FaBars } from 'react-icons/fa'
import { Link } from 'react-router-dom'
export function AppHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState()

    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen)
    }
    return (
        <header className='app-header full'>
            <div className='logo-container'>
                <span className='logo'>WinX</span>
            </div>
            <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
                <ul className='flex align-center'>
                    <li>
                        <a className='nav-link link-underline' to='/edit'>
                            <span>Site</span>
                        </a>
                    </li>
                    <li>
                        <a className='nav-link link-underline' href='#'>
                            <span>Add</span>
                        </a>
                    </li>
                    <li>
                        <a className='nav-link link-underline' href='#'>
                            <span>View</span>
                        </a>
                    </li>
                    <li>
                        <a className='nav-link link-underline' href='#'>
                            <span>Tools</span>
                        </a>
                    </li>
                    <li>
                        <a className='nav-link link-underline' href='#'>
                            <span>Help</span>
                        </a>
                    </li>
                </ul>
            </nav>
            <nav className={`nav-actions ${isMenuOpen ? 'open' : ''}`}>
                <ul className='flex align-center'>
                    <li>
                        <Link className='nav-link link-underline' to='/edit'>
                            <span>Invite +</span>
                        </Link>
                    </li>
                    <li>
                        <a className='nav-link link-underline' href='#'>
                            <span>Preview</span>
                        </a>
                    </li>
                    <li>
                        <Link className='nav-link btn-publish' to='/create'>
                            <span>Publish</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
