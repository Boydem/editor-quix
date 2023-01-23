import diamondSVG from '../../../../assets/imgs/dashboard-assets/diamonds.svg'
import explorerSVG from '../../../../assets/imgs/dashboard-assets/explorer.svg'
import { BsTrash } from 'react-icons/bs'
import { BsPencil } from 'react-icons/bs'
import Chart from 'react-apexcharts'
import { useSelector } from 'react-redux'
import { utilService } from '../../../services/util.service'
import ComposeMail from '../cmps/compose-mail'
import { useState } from 'react'

export function Forms({ user }) {
    const [isMailOpen, setIsMailOpen] = useState(false)
    const wap = utilService.loadFromStorage('wapDB').at(-1)
    const [subscriber, setSubscriber] = useState(null)

    function onMailToSubscriber(sub) {
        setSubscriber(sub)
        setIsMailOpen(true)
    }
    console.log('isMailOpen', isMailOpen)
    return (
        <div className='forms layout-wrapper'>
            <div className='header'>
                <h2>Forms manager</h2>
                <p>Exclusive tool designed to help you build client sites and scale your business.</p>
            </div>
            <div className='col full'>
                <div className='info-box table-box'>
                    <div className='header'>
                        <div className='text-wrapper'>
                            <h3>Subscriptions</h3>
                            <p>Manage all recurring payments coming to you from Pricing Plans, Stores, and Invoices.</p>
                        </div>
                        <button className='btn-send-msg'>Message all</button>
                    </div>
                    <div className='leads-table'>
                        <ul className='table-header container'>
                            <li>Email</li>
                            <li>Actions</li>
                        </ul>
                        {wap.subscribers?.map((sub, idx) => {
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
                            {wap.leads && (
                                <span>
                                    {Object.keys(wap.leads?.at(-1).data).map((key, keyIndex) => {
                                        return (
                                            <li className='col' key={key}>
                                                {key}
                                            </li>
                                        )
                                    })}
                                </span>
                            )}
                        </ul>

                        {wap.leads?.map(lead => {
                            return (
                                <ul className='table-row container'>
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
            </div>
            {isMailOpen && <ComposeMail subscriber={subscriber} setIsMailOpen={setIsMailOpen} />}
            {/* <ComposeMail /> */}
        </div>
    )
}
