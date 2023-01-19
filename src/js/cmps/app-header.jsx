import { useEffect, useState } from 'react'
import { BsFillMoonStarsFill } from 'react-icons/bs'
import { FaBars } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { wapService } from '../services/wap.service'
import { showErrorMsg } from '../services/event-bus.service'
import { saveWap } from '../store/wap/wap.action'
export function AppHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState()
    const { wapId } = useParams()
    const wap = useSelector(storeState => storeState.wapModule.wap)
    const [wapUrlToEdit, setWapUrlToEdit] = useState({ publishUrl: '' })
    const navigate = useNavigate()

    console.log('wap:', wap)
    function handleChange(ev) {
        const value = ev.target.value
        const field = ev.target.name
        setWapUrlToEdit(prev => ({ ...prev, [field]: value }))
    }

    async function publishWap() {
        try {
            wap.url = wapUrlToEdit.publishUrl
            await saveWap(wap)
            navigate(`/${wapUrlToEdit.publishUrl}`)
        } catch (err) {
            showErrorMsg('Couldnt Publish, try again later.')
        }
    }
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
            <div className='publish-link'>
                <label className='publish-url-prefix' htmlFor='publishUrl'>
                    winx.co.il/
                    <input
                        onChange={handleChange}
                        value={wapUrlToEdit.publishUrl}
                        type='text'
                        name='publishUrl'
                        id='publishUrl'
                        placeholder='MySite'
                    />
                    <button onClick={publishWap} className='btn-publish'>
                        Connet your domain.
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
                        <Link className='nav-link publish' to={`/${wap.url}`}>
                            <span>Publish</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
