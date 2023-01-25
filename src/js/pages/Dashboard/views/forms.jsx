import diamondSVG from '../../../../assets/imgs/dashboard-assets/diamonds.svg'
import explorerSVG from '../../../../assets/imgs/dashboard-assets/explorer.svg'
import { BsTrash } from 'react-icons/bs'
import { BsPencil } from 'react-icons/bs'
import Chart from 'react-apexcharts'
import { useSelector } from 'react-redux'
import { makeId, utilService } from '../../../services/util.service'
import ComposeMail from '../cmps/compose-mail'
import { useState } from 'react'

export function Forms({ user, currSite }) {
    const [isMailOpen, setIsMailOpen] = useState(false)
    const [subscriberEmail, setSubscriberEmail] = useState(null)

    function onMailToSubscriber(sub) {
        setSubscriberEmail(sub.email)
        setIsMailOpen(true)
    }
    function onMsgAll() {
        let allSubs = currSite.subscribers.reduce((acc, sub) => {
            acc.push(sub.email)
            return acc
        }, [])
        allSubs = allSubs.join(', ')
        setSubscriberEmail(allSubs)
        setIsMailOpen(true)
    }
    return (
        <>
            <div className='info-box table-box'>
                <div className='header'>
                    <div className='text-wrapper'>
                        <h3>Subscriptions</h3>
                        <p>Manage all recurring payments coming to you from Pricing Plans, Stores, and Invoices.</p>
                    </div>
                    <button className='btn-send-msg' onClick={onMsgAll}>
                        Message all
                    </button>
                </div>
                <div className='leads-table'>
                    <ul className='table-header container'>
                        <li>Email</li>
                        <li>Actions</li>
                    </ul>
                    {currSite.subscribers?.map((sub, idx) => {
                        return (
                            <ul className='table-row container' key={idx}>
                                <li className='lead'>{sub.email}</li>
                                <li className='actions'>
                                    <span className='time-ago'>{utilService.formatTimeAgo(sub.date)}</span>{' '}
                                    <button className='btn-send-msg' onClick={() => onMailToSubscriber(sub)}>
                                        Message
                                    </button>
                                </li>
                            </ul>
                        )
                    })}
                </div>
            </div>
            <div className='info-box table-box'>
                <div className='header'>
                    <div className='text-wrapper'>
                        <h3>My forms</h3>
                    </div>
                    <button className='btn-send-msg'>Download CSV</button>
                </div>
                <div className='user-forms leads-table'>
                    <ul className='table-row table-header container'>
                        {currSite.leads && currSite.leads.length > 0 && (
                            <>
                                {Object.keys(currSite.leads?.at(-1).data).map((key, keyIndex) => {
                                    return (
                                        <li className='col' key={key}>
                                            {key}
                                        </li>
                                    )
                                })}
                            </>
                        )}
                    </ul>

                    {currSite.leads?.map(lead => {
                        return (
                            <ul className='table-row container' key={lead.id}>
                                {Object.keys(lead.data).map((key, keyIndex) => {
                                    return (
                                        <li className='col' key={key}>
                                            {key === 'date' && utilService.formatTimeAgo(lead.data[key])}
                                            {key !== 'date' && lead.data[key]}
                                        </li>
                                    )
                                })}
                            </ul>
                        )
                    })}
                </div>
            </div>
            {isMailOpen && <ComposeMail subscriberEmail={subscriberEmail} setIsMailOpen={setIsMailOpen} />}
        </>
    )
}
