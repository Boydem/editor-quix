import { AppHeader } from '../../cmps/app-header'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { wapService } from '../../services/wap.service'
import { saveWap } from '../../store/wap/wap.action'
import { userService } from '../../services/user.service'
import { LineChart } from './cmps/line-chart'
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service'

import { setUser } from '../../store/user/user.actions'

import { IoAnalyticsOutline } from 'react-icons/io5'
import { GrAnalytics } from 'react-icons/gr'

import { DashboardMain } from './views/dashboard-main'
import { Forms } from './views/forms'
import { Messages } from './views/messages'

export function Dashboard() {
    const activeMenu = useRef('Dashboard')
    const [currView, setCurrView] = useState('dashboard')
    const user = useSelector(storeState => storeState.userModule.user)
    const [userData, setUserData] = useState({})
    const navigate = useNavigate()
    const menuItems = ['Dashboard', 'Messages', 'Forms']
    const { userId } = useParams()

    useEffect(() => {
        if (!userId) navigate('/auth')
        loadUser()
    }, [])

    function onChangeView(view) {
        if (view.toLowerCase() === currView) return
        activeMenu.current = view.toLowerCase()
        setCurrView(view.toLowerCase())
    }

    async function loadUser() {
        if (!userId) return
        try {
            const user = await setUser(userId)
            showSuccessMsg(`Welcome back, ${user.fullname}`)
        } catch (err) {
            showErrorMsg(`Couldn't load user`)
        }
    }

    if (!user) return <div>Loading...</div>
    return (
        <>
            <div className='dashboard full'>
                <AppHeader location={'dashboard'} />
                <aside className='dashboard-sidebar side-start'>
                    <nav className='dashboard-nav'>
                        <ul className='menu-items'>
                            {menuItems.map(menuItem => (
                                <li
                                    className={`menu-item ${activeMenu.current === menuItem ? 'active' : ''}`}
                                    onClick={() => onChangeView(menuItem)}
                                    key={menuItem}
                                >
                                    <span>{menuItem}</span>
                                    <span>
                                        {menuItem === 'Dashboard' && <IoAnalyticsOutline size={'1.4rem'} />}
                                        {menuItem === 'Messages' && <GrAnalytics size={'1.4rem'} />}
                                        {menuItem === 'Forms' && <GrAnalytics size={'1.4rem'} />}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>
                <main className='dashboard-main'>
                    {currView === 'dashboard' && <DashboardMain user={user} />}
                    {currView === 'forms' && <Forms user={user} />}
                    {currView === 'messages' && <Messages user={user} />}
                </main>
            </div>
        </>
    )
}
