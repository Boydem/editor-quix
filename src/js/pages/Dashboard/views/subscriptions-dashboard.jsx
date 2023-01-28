import { useState } from 'react'
import ComposeMail from '../cmps/compose-mail'
import { utilService } from '../../../services/util.service'

export function SubscriptionsDashboard({ user, currSite }) {
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
                    {currSite.subscribers
                        ?.sort((subA, subB) => subB.date - subA.date)
                        .map((sub, idx) => {
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
            {isMailOpen && <ComposeMail subscriberEmail={subscriberEmail} setIsMailOpen={setIsMailOpen} />}
        </>
    )
}
