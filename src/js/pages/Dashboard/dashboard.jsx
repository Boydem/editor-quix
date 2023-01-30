import { useEffect, useRef, useState } from 'react'
import { AppHeader } from '../../cmps/app-header'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router'

import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service'

import { BsPencil } from 'react-icons/bs'
import { IoAnalyticsOutline } from 'react-icons/io5'
import { GrAnalytics } from 'react-icons/gr'

import { DashboardMain } from './views/dashboard-main'
import { SubscriptionsDashboard } from './views/subscriptions-dashboard'

import { setCurrSite, setUser, setUserSites } from '../../store/user/user.actions'
import { MessagesDashboard } from './views/messages-dashboard'
import { SiteSelectDesktop } from './cmps/site-select-desktop'
import { useDispatch } from 'react-redux'
import { SET_CURR_SITE } from '../../store/user/user.reducer'
import { SiteActionsDropdown } from './cmps/site-actions-dropdown'
import { ScheduleDashboard } from './views/schedule-dashboard'
import { KanbanDashboard } from './cmps/kanban-dashboard'
import { LeadsDashboard } from './views/leads-dashboard'
import { Loader } from '../../cmps/loader'

export function Dashboard() {
    const [currView, setCurrView] = useState('home')
    const user = useSelector(storeState => storeState.userModule.user)
    const currSite = useSelector(storeState => storeState.userModule.currSite)
    const navigate = useNavigate()
    const { userId } = useParams()
    const dispatch = useDispatch()

    const menuItems = ['Home', 'Messages', 'Subscriptions', 'Leads', 'Schedule']

    useEffect(() => {
        if (!userId) navigate('/auth/login')
        loadUserSites()
    }, [])

    async function onSiteChange(siteId) {
        try {
            let currSite = user?.sites.find(site => site._id === siteId)

            await setCurrSite(currSite)
            showSuccessMsg(`Currently viewing site: ${currSite.title}`)
        } catch (err) {
            showErrorMsg('Failed selecting site')
        }
    }

    async function onEditSite(ev) {
        if (!currSite?._id) {
            showErrorMsg('Failed Editing site, try again later ')
            return
        }
        navigate(`/edit/${currSite._id}`)
    }

    function onChangeView(view) {
        if (view.toLowerCase() === currView) return
        setCurrView(view.toLowerCase())
    }

    async function loadUserSites() {
        if (!userId) return
        try {
            await setUserSites(user)
            if (!user.sites || !user.sites.length) navigate('/create')
            dispatch({ type: SET_CURR_SITE, currSite: user.sites.at(-1) })
            showSuccessMsg(`Welcome back, ${user.fullname}`)
        } catch (err) {
            showErrorMsg(`Couldn't load user`)
        }
    }

    async function onChangeSite(siteId) {
        let currSite = user?.sites.find(site => site._id === siteId)
        await setCurrSite(currSite)
    }
    let sortedEvents
    if (currSite) {
        const subscribersTimestamps = currSite?.subscribers.reduce((acc, sub) => {
            acc.push(sub.date)
            return acc
        }, [])
        const leadTimestamps = currSite?.leadsBoards[0].items.reduce((acc, lead) => {
            acc.push(lead.data.date)
            return acc
        }, [])
        const msgsTimestamps = Object.keys(currSite?.msgs).reduce((acc, key) => {
            acc.push(currSite?.msgs[key].at(-1).date)
            return acc
        }, [])

        const allTimestamps = { subscribersTimestamps, leadTimestamps, msgsTimestamps }

        sortedEvents = Object.entries(allTimestamps)
            .flatMap(([key, values]) => values.map(timestamp => ({ key, timestamp })))
            .sort((a, b) => b.timestamp - a.timestamp)
            .slice(0, 5)
    }

    if (!user || !currSite) return <Loader />
    return (
        <div className='dashboard full'>
            <AppHeader location={'dashboard'} onSiteChange={onSiteChange} />
            <aside className='dashboard-sidebar side-start'>
                <nav className='dashboard-nav'>
                    <ul className='menu-items'>
                        {menuItems.map(menuItem => (
                            <li
                                className={`menu-item ${currView === menuItem.toLocaleLowerCase() ? 'active' : ''}`}
                                onClick={() => onChangeView(menuItem)}
                                key={menuItem}
                            >
                                <span>{menuItem}</span>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
            <main className='dashboard-main'>
                <div className='main-header layout-wrapper'>
                    <div className='titles'>
                        <h2>Hello, {user.fullname}</h2>
                    </div>
                    <div className='actions'>
                        <SiteActionsDropdown />
                        <button onClick={onEditSite} className='site-actions-edit flex align-center'>
                            <BsPencil /> <span>Edit Site</span>
                        </button>
                    </div>
                </div>
                <div className='layout-wrapper'>
                    <div className='col col-left'>
                        <SiteSelectDesktop
                            user={user}
                            currSite={currSite}
                            onChangeSite={onChangeSite}
                            sortedEvents={sortedEvents}
                        />
                    </div>
                    <div className='col col-right'>
                        {currView === 'home' && <DashboardMain user={user} currSite={currSite} />}
                        {currView === 'subscriptions' && <SubscriptionsDashboard user={user} currSite={currSite} />}
                        {currView === 'leads' && <KanbanDashboard user={user} currSite={currSite} />}
                        {currView === 'messages' && <MessagesDashboard user={user} currSite={currSite} />}
                        {currView === 'schedule' && <ScheduleDashboard user={user} currSite={currSite} />}
                        {/* {currView === 'kanban' && <KanbanDashboard user={user} currSite={currSite} />} */}
                    </div>
                </div>
            </main>
        </div>
    )
}
