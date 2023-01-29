import { useState } from 'react'
import SelectUnit from '../../Editor/cmps/ui-cmps/select'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'

const localizer = momentLocalizer(moment)

export function ScheduleDashboard({ user, currSite }) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednsday', 'Thursday', 'Friday', 'Saturday']
    const [dayToPreview, setDayToPreview] = useState('Sunday')

    function onDayChange(selectedDay) {
        setDayToPreview(selectedDay)
    }
    const events = currSite.schedule.meetings.reduce((acc, meeting) => {
        try {
            acc.push({
                start: moment(meeting.datetime.startTime).toDate(),
                end: moment(meeting.datetime.endTime).toDate(),
                title: `${meeting.fullname}, ${meeting.phoneNumber}`,
            })
        } catch (err) {}

        return acc
    }, [])

    // const events = [
    //     {
    //         start: moment().toDate(),
    //         end: moment().add(1, 'days').toDate(),
    //         title: 'Some title',
    //     },
    // ]

    return (
        <section className='schedule-dashboard'>
            {/* <div className='info-box schedule-intro'>
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
            </div> */}
            <div className='info-box table-box'>
                <div className='header'>
                    <div className='text-wrapper'>
                        <h3>Scheduled meetings</h3>
                    </div>
                    {/* <div className='text-wrapper'>
                        <h3>Total meetings: 20</h3>
                    </div> */}
                    <h3 className='total-meetings'>Total meetings {events.length}</h3>
                    {/* <button className='btn-send-msg'>Download CSV</button> */}
                </div>

                <div className='calendar-container'>
                    <Calendar
                        localizer={localizer}
                        defaultDate={moment().toDate()}
                        defaultView='week'
                        events={events}
                        style={{ height: '100%', width: '100%' }}
                    />
                </div>
            </div>
        </section>
    )
}
