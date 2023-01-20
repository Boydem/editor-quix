import { useState } from 'react'
import { Link } from 'react-router-dom'

export function DarkHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState()

    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen)
    }
    return (
        <header className='dark-header app-header full'>
            <div className='logo-container'>
                <Link to='/' className='logo'>
                    Webix.
                </Link>
            </div>
            <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
                <ul className='flex align-center'>
                    <li>
                        <a className='nav-link link-underline' href='#'>
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
        </header>
    )
}
