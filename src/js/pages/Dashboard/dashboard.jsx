import { AppHeader } from '../../cmps/app-header'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { wapService } from '../../services/wap.service'
import { showErrorMsg } from '../../services/event-bus.service'
import { saveWap } from '../../store/wap/wap.action'

export function Dashboard() {
    const [activeMenu, setActiveMenu] = useState('Statistics')
    const menuItems = [
        ['Statistics', 'SEO', 'BLA'],
        ['asd', 'dsa'],
    ]

    return (
        <>
            <AppHeader />
            <div className='dashboard full'>
                <aside className='dashboard-sidebar'>
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
                <main className='dashboard-main'></main>
            </div>
        </>
    )
}
