import { Link } from 'react-router-dom'

export function DarkHeader() {
    return (
        <header className='dark-header app-header full'>
            <div className='logo-container'>
                <Link to='/' className='logo'>
                    quix.
                </Link>
            </div>
        </header>
    )
}
