import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

import { saveWap } from '../store/wap/wap.action'
import { logout } from '../store/user/user.actions'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { BiBell } from 'react-icons/bi'
import { SiteSelect } from './site-select'
import { InteractiveChat } from '../pages/Editor/cmps/ui-cmps/interactive-chat'
import { QuixLogo } from './quix-logo'
import { UserTooltip } from './user-tooltip'

export function AppHeader({ location = 'editor', theme = '', layout = 'full', onSiteChange }) {
    const [isMenuOpen, setIsMenuOpen] = useState()
    const { wapId } = useParams()
    const wap = useSelector(storeState => storeState.wapModule.wap)
    const [wapUrlToEdit, setWapUrlToEdit] = useState({ publishUrl: '' })
    const navigate = useNavigate()
    const user = useSelector(storeState => storeState.userModule.user)
    const currSite = useSelector(storeState => storeState.userModule.currSite)
    useEffect(() => {
        if (wap?.url) setWapUrlToEdit({ publishUrl: wap.url })
    }, [])

    function handleChange(ev) {
        const value = ev.target.value
        const field = ev.target.name
        setWapUrlToEdit(prev => ({ ...prev, [field]: value }))
    }

    async function publishWap() {
        if (!user) {
            showErrorMsg('You must login first')
            return
        }
        try {
            wap.owner = user._id
            wap.url = wapUrlToEdit.publishUrl
            // --- choose title if first time publish
            // --- choose to nav to preview or dashboard -- CTA dashboard
            await saveWap(wap)
            navigate(`/${wapUrlToEdit.publishUrl}`)
            showSuccessMsg('Your site has been published!')
        } catch (err) {
            showErrorMsg(`Couldn't Publish, try again later.`)
        }
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
        <header
            data-location={location}
            className={`${theme} app-header full ${layout} ${location === 'auth' ? 'auth' : ''}`}
        >
            <div className='layout-wrapper'>
                <div className='logo-container'>
                    <Link to='/' className='logo'>
                        <QuixLogo />
                    </Link>
                </div>
                {location === 'dashboard' && (
                    <>
                        <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
                            <ul className='flex align-center'></ul>
                        </nav>
                        <ul className='icons-group'>
                            <li className='icon-container'>
                                <InteractiveChat />
                            </li>
                            <li className='icon-container'>
                                <button
                                    data-tooltip='Notifications'
                                    data-tooltip-dir='bottom'
                                    className='btn-icon notifications'
                                >
                                    <BiBell />
                                </button>
                            </li>
                        </ul>
                    </>
                )}
                {location === 'editor' && (
                    <>
                        <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
                            <ul className='user-area'>
                                <UserTooltip user={user} />
                            </ul>
                        </nav>
                        <div className='site-link'>
                            <label className='publish-url-prefix' htmlFor='publishUrl'>
                                quix.co.il/
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
