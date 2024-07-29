import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

const localizer = momentLocalizer(moment)

export function ScheduleDashboard({ user, currSite }) {

    
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



    return (
        <section className='schedule-dashboard'>
            
            <div className='info-box table-box'>
                <div className='header'>
                    <div className='text-wrapper'>
                        <h3>Scheduled meetings</h3>
                    </div>
                    <h3 className='total-meetings'>Total meetings {events.length}</h3>
                    
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
