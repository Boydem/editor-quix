import diamondSVG from '../../../../assets/imgs/dashboard-assets/diamonds.svg'
import { SiGooglemessages } from 'react-icons/si'
import { FaCalendarCheck } from 'react-icons/fa'
import { FaUsers } from 'react-icons/fa'
import { BsArrowUp } from 'react-icons/bs'
import { AiOutlineArrowUp } from 'react-icons/ai'
import { FiArrowUp } from 'react-icons/fi'
import { HiArrowNarrowUp, HiArrowUp, HiOutlineArrowUp } from 'react-icons/hi'
import { FaLongArrowAltUp } from 'react-icons/fa'

import { FaUserCheck } from 'react-icons/fa'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { ScheduleCmp } from '../../Editor/cmps/dynamic-cmps/schedule-cmp'
import { Loader } from '../../../cmps/loader'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Title, Tooltip, Legend)

export function DashboardMain({ user, currSite }) {
    const DAY = 1000 * 60 * 60 * 24

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
            },
        },
    }
    const labels = [
        new Date(Date.now() - 6 * DAY).toLocaleDateString(),
        new Date(Date.now() - 5 * DAY).toLocaleDateString(),
        new Date(Date.now() - 4 * DAY).toLocaleDateString(),
        new Date(Date.now() - 3 * DAY).toLocaleDateString(),
        new Date(Date.now() - 2 * DAY).toLocaleDateString(),
        new Date(Date.now() - 1 * DAY).toLocaleDateString(),
        new Date(Date.now() - 0 * DAY).toLocaleDateString(),
    ]

    function organizeTimestamps(timestamps) {
        if (!timestamps || !timestamps.length) return [0, 0, 0, 0, 0, 0, 0]
        const today = new Date()
        const oneDay = 24 * 60 * 60 * 1000 // milliseconds in one day
        const week = new Array(7).fill(0) // create an array of 7 places filled with 0
        for (let timestamp of timestamps) {
            const date = new Date(timestamp)
            const diffDays = Math.round(Math.abs((today.getTime() - date.getTime()) / oneDay))
            if (diffDays < 7) {
                week[diffDays] += 1
            }
        }
        return week
    }

    const subscribersTimestamps = currSite?.subscribers?.reduce((acc, sub) => {
        acc.push(sub.date)
        return acc
    }, [])

    const leadTimestamps1 = currSite?.leadsBoards[0].items?.reduce((acc, lead) => {
        acc.push(lead.data.date)
        return acc
    }, [])
    const leadTimestamps2 = currSite?.leadsBoards[1].items?.reduce((acc, lead) => {
        acc.push(lead.data.date)
        return acc
    }, [])
    const leadTimestamps3 = currSite?.leadsBoards[2].items?.reduce((acc, lead) => {
        acc.push(lead.data.date)
        return acc
    }, [])
    const leadTimestamps = [...leadTimestamps1, ...leadTimestamps2, ...leadTimestamps3]

    let organizedLeadsTimestamps = [0, 0, 0, 0, 0, 0, 0]
    organizedLeadsTimestamps = organizeTimestamps(leadTimestamps)
    organizedLeadsTimestamps.reverse()

    let organizedSubscribersTimestamps = [0, 0, 0, 0, 0, 0, 0]
    organizedSubscribersTimestamps = organizeTimestamps(subscribersTimestamps)
    organizedSubscribersTimestamps.reverse()

    let organizedVisitorsTimestamps = [0, 0, 0, 0, 0, 0, 0]
    organizedVisitorsTimestamps = organizeTimestamps(currSite?.visitors)
    organizedVisitorsTimestamps.reverse()

    const subData = {
        labels,
        datasets: [
            {
                lineTension: 0.4,
                pointRadius: 3,
                fill: true,
                label: 'Subscribers',
                data: currSite.demoData?.subsData || organizedSubscribersTimestamps,
                // data: [7, 15, 17, 14, 13, 21, 24],

                borderColor: '#23cc93',
                backgroundColor: 'rgba(35, 204, 147,0.4)',
            },
        ],
    }
    const leadData = {
        labels,
        datasets: [
            {
                lineTension: 0.4,
                pointRadius: 3,
                fill: true,
                label: 'Leads',
                data: currSite.demoData?.leadData || organizedLeadsTimestamps,
                // data: [12, 15, 16, 14, 13, 18, 17],
                borderColor: '#24a0fe',
                backgroundColor: 'rgba(36, 160, 254, 0.4)',
            },
        ],
    }
    const visitorsData = {
        labels,
        datasets: [
            {
                lineTension: 0.4,
                fill: true,
                label: 'Visitors',
                data: currSite.demoData?.visitorsData || organizedVisitorsTimestamps,
                borderColor: '#24a0fe',
                backgroundColor: 'rgba(36, 160, 254, 0.4)',
            },
        ],
    }

    function generateTimestamps() {
        const date = new Date()
        const oneWeekAgo = new Date(date.getTime() - 14 * 24 * 60 * 60 * 1000)
        const timestamps = []
        for (let i = 0; i < 1250; i++) {
            const randomTimestamp = new Date(
                oneWeekAgo.getTime() + Math.random() * (date.getTime() - oneWeekAgo.getTime())
            )
            timestamps.push(randomTimestamp.getTime())
        }
        return timestamps
    }

    function countNewMsgsPercent(msgs) {
        let thisWeek = 0
        let lastWeek = 0
        let today = new Date()

        for (let msgId in msgs) {
            let msgDate = new Date(msgs[msgId][0].date)
            let dayDiff = (today - msgDate) / (1000 * 60 * 60 * 24)

            if (dayDiff <= 7) {
                thisWeek++
            } else if (dayDiff <= 14) {
                lastWeek++
            }
        }
        if (lastWeek === 0) return thisWeek * 100
        return ((thisWeek - lastWeek) / lastWeek) * 100
    }
    function countTimestampsPercent(timestamps) {
        let thisWeek = 0
        let lastWeek = 0
        let today = new Date()
        if (!timestamps) return 0

        // for (let i = 0; i < subs.length; i++) {
        timestamps.forEach(msgDate => {
            let dayDiff = (today - msgDate) / (1000 * 60 * 60 * 24)

            if (dayDiff <= 7) {
                thisWeek++
            } else if (dayDiff <= 14) {
                lastWeek++
            }
        })

        // }
        if (lastWeek === 0) return thisWeek * 100
        return ((thisWeek - lastWeek) / lastWeek) * 100
    }
    function countNewAppointmentsPercent(timestamps) {
        const scheduleTimestamps = timestamps?.meetings?.reduce((acc, meeting) => {
            const meetingTime = meeting.datetime?.startTime
            if (!meetingTime) return acc
            const meetingTimestamp = new Date(meetingTime)
            acc.push(meetingTimestamp.getTime())
            return acc
        }, [])
        return countTimestampsPercent(scheduleTimestamps)
    }

    const messagesPercent = countNewMsgsPercent(currSite?.msgs)
    const subscribersPercent = countTimestampsPercent(subscribersTimestamps)
    const leadsPercent = countTimestampsPercent(leadTimestamps)
    const appointmentsPercent = countNewAppointmentsPercent(currSite?.schedule)
    // countNewAppointmentsPercent(currSite?.schedule)

    if (!currSite) return <Loader />
    return (
        <>
            <div className='info-box  flex justify-between mb-1'>
                <div className='text-wrapper'>
                    <h3>Welcome to your Partner Dashboard</h3>
                    <p>
                        Advance to new levels as you earn points for creating Premium sites. For each level you reach,
                        you unlock new benefits.
                    </p>
                </div>
                <div className='img-wrapper'>
                    <img src={diamondSVG} alt='diamonds' />
                </div>
            </div>
            <div className='data-list '>
                {/* <div className='intro-full-w'>
                    <h3>Overview</h3>
                </div> */}
                <div className='mini-info-box'>
                    <div className='data-wrapper'>
                        <h3>Messages</h3>
                        {/* <div className='icon'>
                            <SiGooglemessages size={'1.5rem'} />
                        </div> */}
                        <h2>{currSite.demoData?.messages || Object.keys(currSite.msgs).length}</h2>
                        <h4
                            className={`${
                                currSite.demoData?.messagesPercent > 0 || messagesPercent > 0 ? 'success' : ''
                            }`}
                        >
                            <div className='yaron-icon'>
                                <HiOutlineArrowUp size={'0.85rem'} />
                            </div>
                            {currSite.demoData?.messagesPercent || messagesPercent}%
                        </h4>
                        <p>vs previous 7 days</p>
                    </div>
                </div>
                <div className='mini-info-box'>
                    <div className='data-wrapper'>
                        <h3>Appointments</h3>
                        {/* <div className='icon'>
                            <FaCalendarCheck size={'1.5rem'} />
                        </div> */}
                        <h2>{currSite.demoData?.appointments || currSite.schedule?.meetings?.length}</h2>
                        <h4
                            className={`${
                                currSite.demoData?.appointmentsPercent > 0 || appointmentsPercent > 0 ? 'success' : ''
                            }`}
                        >
                            <div className='yaron-icon'>
                                <HiOutlineArrowUp size={'0.85rem'} />
                            </div>
                            {currSite.demoData?.appointmentsPercent || appointmentsPercent}%
                        </h4>
                        <p>vs previous 7 days</p>
                    </div>
                </div>
                <div className='mini-info-box'>
                    <div className='data-wrapper'>
                        <h3>Leads</h3>
                        {/* <div className='icon'>
                            <FaUsers size={'1.5rem'} />
                        </div> */}
                        <h2>
                            {currSite.demoData?.leads ||
                                currSite.leadsBoards[0]?.items?.length +
                                    currSite.leadsBoards[1]?.items?.length +
                                    currSite.leadsBoards[2]?.items?.length}
                        </h2>
                        <h4 className={`${currSite.demoData?.leadsPercent > 0 || leadsPercent > 0 ? 'success' : ''}`}>
                            <div className='yaron-icon'>
                                <HiOutlineArrowUp size={'0.85rem'} />
                            </div>
                            {currSite.demoData?.leadsPercent || leadsPercent}%
                        </h4>
                        <p>vs previous 7 days</p>
                    </div>
                </div>
                <div className='mini-info-box'>
                    <div className='data-wrapper'>
                        <h3>Subscribers</h3>
                        {/* <div className='icon'>
                            <FaUserCheck size={'1.5rem'} />
                        </div> */}
                        <h2>{currSite.demoData?.subscribers || currSite.subscribers.length}</h2>
                        <h4
                            className={`${
                                currSite.demoData?.subscribersPercent > 0 || subscribersPercent > 0 ? 'success' : ''
                            }`}
                        >
                            <div className='yaron-icon'>
                                <HiOutlineArrowUp size={'0.85rem'} />
                            </div>
                            {currSite.demoData?.subscribersPercent || subscribersPercent}%
                        </h4>
                        <p>vs previous 7 days</p>
                    </div>
                </div>
            </div>

            <div className='info-box flex'>
                <div className='text-wrapper'>
                    <h3>Leads</h3>
                    <p>Here is your sites leads statistics</p>
                </div>
                <div className='info-box chart-wrapper'>
                    <Line options={options} data={leadData} />
                </div>
            </div>

            <div className='info-box flex'>
                <div className='text-wrapper'>
                    <h3>Subscribers</h3>
                    <p>Here is your sites subscribers statistics</p>
                </div>
                <div className='info-box chart-wrapper'>
                    <Line options={options} data={subData} />
                </div>
            </div>

            <div className='info-box flex'>
                <div className='text-wrapper'>
                    <h3>Visitors</h3>
                    <p>Here is your sites visitors statistics</p>
                </div>
                <div className='info-box chart-wrapper'>
                    <Line options={options} data={visitorsData} />
                </div>
            </div>
        </>
    )
}
