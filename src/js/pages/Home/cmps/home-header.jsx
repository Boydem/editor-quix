import { Link } from 'react-router-dom'
import { QuixLogo } from '../../../cmps/quix-logo'

export function HomeHeader() {

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
