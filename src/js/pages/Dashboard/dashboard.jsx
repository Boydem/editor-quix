import { AppHeader } from '../../cmps/app-header'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { wapService } from '../../services/wap.service'
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service'
import { saveWap } from '../../store/wap/wap.action'
import { userService } from '../../services/user.service'
import { setUser } from '../../store/user/user.actions'
import diamondSVG from '../../../assets/imgs/dashboard-assets/diamonds.svg'
import explorerSVG from '../../../assets/imgs/dashboard-assets/explorer.svg'
import { BsTrash } from 'react-icons/bs'
import { BsPencil } from 'react-icons/bs'

export function Dashboard() {
    const [activeMenu, setActiveMenu] = useState('Statistics')
    const user = useSelector(storeState => storeState.userModule.user)
    const menuItems = [
        ['Statistics', 'SEO', 'BLA'],
        ['asd', 'dsa'],
    ]
    const navigate = useNavigate()
    const { userId } = useParams()
    useEffect(() => {
        if (!userId) navigate('/auth')
        loadUser()
    }, [])

    async function loadUser() {
        if (!userId) return
        try {
            let user = await setUser(userId)
            showSuccessMsg(`Welcome back, ${user.fullname}`)
            console.log('user:', user)
        } catch (err) {
            showErrorMsg('Couldnt load user')
        }
    }

    if (!user) return <div>Loading...</div>
    return (
        <>
            <div className='dashboard full'>
                <AppHeader location={'dashboard'} />
                <aside className='dashboard-sidebar side-start'>
                    <nav className='dashboard-nav'>
                        {menuItems.map((menuItems, idx) => (
                            <ul key={idx} className='menu-items'>
                                {menuItems.map(menuItem => (
                                    <li
                                        className={`menu-item ${activeMenu === menuItem ? 'active' : ''}`}
                                        onClick={() => {
                                            setActiveMenu(menuItem)
                                        }}
                                        key={menuItem}
                                    >
                                        {menuItem}
                                    </li>
                                ))}
                            </ul>
                        ))}
                    </nav>
                </aside>
                <main className='dashboard-main'>
                    <div className='layout-wrapper'>
                        <div className='header'>
                            <h2>Hello, {user.fullname}</h2>
                            <p>Access exclusive tools to help you build client sites and scale your business.</p>
                        </div>
                        <div className='col col-left'>
                            <div className='info-box-1 info-box'>
                                <div className='text-wrapper'>
                                    <h3>Welcome to your Partner Dashboard</h3>
                                    <p>
                                        Advance to new levels as you earn points for creating Premium sites. For each
                                        level you reach, you unlock new benefits.
                                    </p>
                                </div>
                                <div className='img-wrapper'>
                                    <img src={diamondSVG} alt='diamonds' />
                                </div>
                            </div>
                            <div className='info-box'>
                                <div className='text-wrapper'>
                                    <h3>Welcome to your Partner Dashboard</h3>
                                    <p>
                                        Advance to new levels as you earn points for creating Premium sites. For each
                                        level you reach, you unlock new benefits.
                                    </p>
                                </div>
                                <div className='img-wrapper'>
                                    <img src={diamondSVG} alt='diamonds' />
                                </div>
                            </div>
                            <div className='info-box'>
                                <div className='text-wrapper'>
                                    <h3>Welcome to your Partner Dashboard</h3>
                                    <p>
                                        Advance to new levels as you earn points for creating Premium sites. For each
                                        level you reach, you unlock new benefits.
                                    </p>
                                </div>
                                <div className='img-wrapper'>
                                    <img src={diamondSVG} alt='diamonds' />
                                </div>
                            </div>
                        </div>
                        <div className='col col-right'>
                            <div className='info-box info-box-2'>
                                <div className='text-wrapper'>
                                    <h3>Your Partner level</h3>
                                    <div className='level flex align-center'>
                                        <img src={explorerSVG} alt='explorerSVG' /> <h2>Explorer</h2>
                                    </div>
                                    <p>You have 35 points. Only 400 points until you reach the next level.</p>
                                </div>
                            </div>
                            <div className='info-box my-sites'>
                                <div className='wap-preview header'>
                                    <h3>My sites</h3>
                                </div>
                                <article className='wap-preview'>
                                    <div className='item'>
                                        <img src={explorerSVG} alt='explorerSVG' />
                                        <span>My Site 1</span>
                                        <div className='actions flex'>
                                            <button className='tool'>
                                                <BsPencil />
                                            </button>
                                            <button className='tool'>
                                                <BsTrash />
                                            </button>
                                        </div>
                                    </div>
                                </article>
                                <article className='wap-preview'>
                                    <div className='item'>
                                        <img src={explorerSVG} alt='explorerSVG' />
                                        <span>My Site 2</span>
                                        <div className='actions flex'>
                                            <button className='tool'>
                                                <BsPencil />
                                            </button>
                                            <button className='tool'>
                                                <BsTrash />
                                            </button>
                                        </div>
                                    </div>
                                </article>
                                <article className='wap-preview'>
                                    <div className='item'>
                                        <img src={explorerSVG} alt='explorerSVG' />
                                        <span>My Site 3</span>
                                        <div className='actions flex'>
                                            <button className='tool'>
                                                <BsPencil />
                                            </button>
                                            <button className='tool'>
                                                <BsTrash />
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}
