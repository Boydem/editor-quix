import { useEffect, useState } from 'react'
import { BsFillMoonStarsFill } from 'react-icons/bs'
import { saveWap } from '../store/wap/wap.action'
import { logout } from '../store/user/user.actions'
import { FaBars } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import noamImg from '../../assets/imgs/dashboard-assets/noam-tn.jpg'
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { BiBell } from 'react-icons/bi'
import { FiMessageSquare } from 'react-icons/fi'
export function AppHeader({ location = 'editor', theme = '', layout = 'full' }) {
    const [isMenuOpen, setIsMenuOpen] = useState()
    const { wapId } = useParams()
    const wap = useSelector(storeState => storeState.wapModule.wap)
    const [wapUrlToEdit, setWapUrlToEdit] = useState({ publishUrl: '' })
    const navigate = useNavigate()
    const user = useSelector(storeState => storeState.userModule.user)
    useEffect(() => {
        if (wap?.url) setWapUrlToEdit({ publishUrl: wap.url })
    }, [])

    function handleChange(ev) {
        const value = ev.target.value
        const field = ev.target.name
        setWapUrlToEdit(prev => ({ ...prev, [field]: value }))
    }

    async function onLogout() {
        try {
            await logout()
            showSuccessMsg('Logged out')
        } catch (err) {
            showErrorMsg('Logout failed')
        }
    }

    async function publishWap() {
        if (!user) {
            showErrorMsg('You must login first')
            return
        }
        try {
            wap.owner = user._id
            wap.url = wapUrlToEdit.publishUrl
            await saveWap(wap)
            navigate(`/${wapUrlToEdit.publishUrl}`)
            showSuccessMsg('Your site has been published!')
        } catch (err) {
            showErrorMsg(`Couldn't Publish, try again later.`)
        }
    }
    function getShortenName() {
        if (!user) return '?'
        const names = user.fullname.split(' ')
        return names[0][0] + names[1][0]
    }
    function onEditDomain() {
        if (!wap.url) return
        wap.url = wapUrlToEdit.publishUrl
        showSuccessMsg('Your site URL has been updated!')
    }
    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen)
    }
    return (
        <header className={`${theme} app-header full ${layout} ${location === 'auth' ? 'auth' : ''}`}>
            <div className='layout-wrapper'>
                <div className='logo-container'>
                    <Link to='/' className='logo'>
                        Webix.
                    </Link>
                </div>
                {location === 'dashboard' && (
                    <>
                        <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
                            <ul className='flex align-center'>
                                <li>
                                    <a className='nav-link link-underline' href='#'>
                                        <span>My Sites</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                        <div className='interactives'>
                            <button data-tooltip='Chat' data-tooltip-dir='bottom' className='tool inbox'>
                                <FiMessageSquare />
                            </button>
                            <button
                                data-tooltip='Notifications'
                                data-tooltip-dir='bottom'
                                className='tool notifications'
                            >
                                <BiBell />
                            </button>
                        </div>
                    </>
                )}
                {location === 'editor' && (
                    <>
                        <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
                            <ul className='user-area'>
                                <div className='avatar'>
                                    {getShortenName()}
                                    {/* <img src={user.imgUrl} alt='userAvatar' /> */}
                                </div>
                                <div className='user-info'>
                                    {user && <div className='user-fullname'>{user.fullname}</div>}
                                    <div className='user-links'>
                                        {user ? (
                                            <>
                                                <Link className='btn-dashboard' to={`/dashboard/${user._id}`}>
                                                    Dashboard
                                                </Link>
                                                <span className='btn-logout' onClick={onLogout}>
                                                    Logout
                                                </span>
                                            </>
                                        ) : (
                                            <Link to={`/auth`}>Login</Link>
                                        )}
                                    </div>
                                </div>
                            </ul>
                        </nav>
                        <div className='publish-link'>
                            <label className='publish-url-prefix' htmlFor='publishUrl'>
                                webix.co.il/
                                <input
                                    onChange={handleChange}
                                    value={wapUrlToEdit.publishUrl}
                                    type='text'
                                    name='publishUrl'
                                    id='publishUrl'
                                    placeholder='MySite'
                                />
                                <button onClick={onEditDomain} className='btn-publish'>
                                    {wap.url && 'Edit your domain.'}
                                </button>
                            </label>
                        </div>
                        <nav className={`nav-actions ${isMenuOpen ? 'open' : ''}`}>
                            <ul className='flex align-center'>
                                <li>
                                    <Link className='nav-link' to='/edit'>
                                        <span>Invite</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link className='nav-link preview' to={`/preview/${wapId}`}>
                                        <span>Preview</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link className='nav-link publish' onClick={publishWap}>
                                        <span>Publish</span>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </>
                )}
            </div>
        </header>
    )
}
