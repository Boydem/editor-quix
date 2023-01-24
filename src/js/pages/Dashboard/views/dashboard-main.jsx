import { useEffect, useRef } from 'react'

import diamondSVG from '../../../../assets/imgs/dashboard-assets/diamonds.svg'

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
import { Bar, Line } from 'react-chartjs-2'
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
    const leadTimestamps = currSite.leads?.reduce((acc, lead) => {
        acc.push(lead.data.date)
        return acc
    }, [])

    let organizedLeadsTimestamps = [0, 0, 0, 0, 0, 0, 0]
    organizedLeadsTimestamps = organizeTimestamps(leadTimestamps)
    organizedLeadsTimestamps.reverse()

    let organizedSubscribersTimestamps = [0, 0, 0, 0, 0, 0, 0]
    organizedSubscribersTimestamps = organizeTimestamps(subscribersTimestamps)
    organizedSubscribersTimestamps.reverse()

    const subData = {
        labels,
        datasets: [
            {
                pointRadius: 3,
                fill: true,
                label: 'Subscribers',
                data: organizedSubscribersTimestamps,

                borderColor: '#23cc93',
                backgroundColor: 'rgba(35, 204, 147,0.4)',
            },
        ],
    }
    const leadData = {
        labels,
        datasets: [
            {
                pointRadius: 3,
                fill: true,
                label: 'Leads',
                data: organizedLeadsTimestamps,
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
                data: [50, 42, 15, 32, 64, 15, 16],
                borderColor: '#24a0fe',
                backgroundColor: 'rgba(36, 160, 254, 0.4)',
            },
        ],
    }

    if (!currSite) return <div>Loading....</div>
    return (
        <>
            <div className='info-box  flex justify-between'>
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
