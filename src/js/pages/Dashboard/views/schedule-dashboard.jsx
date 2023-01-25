import { useState } from 'react'
import SelectUnit from '../../Editor/cmps/ui-cmps/select'

export function ScheduleDashboard({ user, currSite }) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednsday', 'Thursday', 'Friday', 'Saturday']
    const [dayToPreview, setDayToPreview] = useState('Sunday')

    function onDayChange(selectedDay) {
        setDayToPreview(selectedDay)
    }
    return (
        <section className='schedule-dashboard'>
            <div className='info-box schedule-intro'>
                <div className='choose-day'>
                    <span>Choose day:</span>
                    <SelectUnit
                        unit={dayToPreview}
                        onUnitChange={onDayChange}
                        unitOpts={days}
                        placeholder={'Select day'}
                    />
                </div>
                <div className='total-meeting'>
                    <h4>Total meetings: 20</h4>
                </div>
            </div>
            <div className='info-box table-box'>
                <div className='header'>
                    <div className='text-wrapper'>
                        <h3>Scheduled meetings:</h3>
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
                                            {key === 'date' && '7:30'}
                                            {key !== 'date' && lead.data[key]}
                                        </li>
                                    )
                                })}
                            </ul>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
