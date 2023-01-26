import { useState } from 'react'
import ComposeMail from '../cmps/compose-mail'
import { utilService } from '../../../services/util.service'

export function LeadsDashboard({ user, currSite }) {
    return (
        <>
            <div className='info-box table-box'>
                <div className='header'>
                    <div className='text-wrapper'>
                        <h3>My leads</h3>
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
        </>
    )
}
