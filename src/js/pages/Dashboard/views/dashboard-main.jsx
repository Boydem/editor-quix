import { useEffect, useRef } from 'react'

import diamondSVG from '../../../../assets/imgs/dashboard-assets/diamonds.svg'

import Chart from 'react-apexcharts'

export function DashboardMain({ user, currSite }) {
    const subscribersChartRef = useRef()
    const leadsChartRef = useRef()
    const visitorsChartRef = useRef()
    useEffect(() => {
        // console.log('currSite has changed')
        // console.log('organizedLeadsTimestamps', organizedLeadsTimestamps)
        // console.log('organizedSubscribersTimestamps', organizedSubscribersTimestamps)

        // organizedLeadsTimestamps = organizeTimestamps(leadTimestamps)
        // organizedLeadsTimestamps.reverse()
        // setOrganizedLeadsTimestamps(organizedLeadsTimestamps)

        // organizedSubscribersTimestamps = organizeTimestamps(subscribersTimestamps)
        // organizedSubscribersTimestamps.reverse()
        // setOrganizedSubscribersTimestamps(organizedSubscribersTimestamps)
        // console.log('organizedSubscribersTimestamps:', organizedSubscribersTimestamps)

        subscribersChartRef.current.render()
    }, [currSite])
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


    // let [organizedLeadsTimestamps, setOrganizedLeadsTimestamps] = useState([0, 0, 0, 0, 0, 0, 0])
    let organizedLeadsTimestamps = [0, 0, 0, 0, 0, 0, 0]

    organizedLeadsTimestamps = organizeTimestamps(leadTimestamps)
    organizedLeadsTimestamps.reverse()
    // let [organizedSubscribersTimestamps, setOrganizedSubscribersTimestamps] = useState([0, 0, 0, 0, 0, 0, 0])
    let organizedSubscribersTimestamps = [0, 0, 0, 0, 0, 0, 0]

    organizedSubscribersTimestamps = organizeTimestamps(subscribersTimestamps)
    organizedSubscribersTimestamps.reverse()
    // }
    // setInterval(() => {
    //     organizedLeadsTimestamps.push(1)
    // }, 1000)
    const DAY = 1000 * 60 * 60 * 24
    let LeadsChartOptions = useRef({
        series: [
            {
                // data: organizedLeadsTimestamps,
                data: organizedLeadsTimestamps,
            },
        ],
        options: {
            // chart: {
            //     type: 'line',
            //     height: 430,
            // },
            // plotOptions: {
            //     bar: {
            //         // horizontal: true,
            //         dataLabels: {
            //             position: 'top',
            //         },
            //     },
            // },
            // dataLabels: {
            //     enabled: true,
            //     offsetY: 6,
            //     style: {
            //         fontSize: '12px',
            //         colors: ['#fff'],
            //     },
            // },
            // stroke: {
            //     show: true,
            //     width: 1,
            //     colors: ['#fff'],
            // },
            // tooltip: {
            //     shared: true,
            //     intersect: false,
            // },
            xaxis: {
                categories: [
                    new Date(Date.now() - 6 * DAY).toLocaleDateString(),
                    new Date(Date.now() - 5 * DAY).toLocaleDateString(),
                    new Date(Date.now() - 4 * DAY).toLocaleDateString(),
                    new Date(Date.now() - 3 * DAY).toLocaleDateString(),
                    new Date(Date.now() - 2 * DAY).toLocaleDateString(),
                    new Date(Date.now() - 1 * DAY).toLocaleDateString(),
                    new Date(Date.now() - 0 * DAY).toLocaleDateString(),
                ],
            },
        },
    })
    let SubsChartOptions = useRef({
        series: [
            {
                data: organizedSubscribersTimestamps,
            },
        ],
        options: {
            chart: {
                type: 'bars',
                height: 430,
            },
            plotOptions: {
                bar: {
                    // horizontal: true,
                    dataLabels: {
                        position: 'top',
                    },
                },
            },
            dataLabels: {
                enabled: true,
                offsetY: 6,
                style: {
                    fontSize: '12px',
                    colors: ['#fff'],
                },
            },
            stroke: {
                show: true,
                width: 1,
                colors: ['#fff'],
            },
            tooltip: {
                shared: true,
                intersect: false,
            },
            xaxis: {
                categories: [
                    new Date(Date.now() - 6 * DAY).toLocaleDateString(),
                    new Date(Date.now() - 5 * DAY).toLocaleDateString(),
                    new Date(Date.now() - 4 * DAY).toLocaleDateString(),
                    new Date(Date.now() - 3 * DAY).toLocaleDateString(),
                    new Date(Date.now() - 2 * DAY).toLocaleDateString(),
                    new Date(Date.now() - 1 * DAY).toLocaleDateString(),
                    new Date(Date.now() - 0 * DAY).toLocaleDateString(),
                ],
            },
        },
    })
    let visitorsChartOptions = useRef({
        series: [
            {
                name: 'series1',
                data: [31, 40, 28, 51, 42, 109, 100],
            },
            {
                name: 'series2',
                data: [11, 32, 45, 32, 34, 52, 41],
            },
        ],
        chart: {
            height: '100%',
            width: '100%',
            type: 'area',
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
        },
        xaxis: {
            type: 'datetime',
            categories: [
                '2018-09-19T00:00:00.000Z',
                '2018-09-19T01:30:00.000Z',
                '2018-09-19T02:30:00.000Z',
                '2018-09-19T03:30:00.000Z',
                '2018-09-19T04:30:00.000Z',
                '2018-09-19T05:30:00.000Z',
                '2018-09-19T06:30:00.000Z',
            ],
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy HH:mm',
            },
        },
    })
    if (!user?.sites) return <div>Loading....</div>
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
                    <h3>Subscribers</h3>
                    <p>Here is your sites subscribers statistics</p>
                </div>
                <div className='info-box chart-wrapper'>
                    <Chart
                        options={SubsChartOptions.current.options}
                        series={SubsChartOptions.current.series}
                        type={'bar'}
                        width={'100%'}
                        height={300}
                        ref={subscribersChartRef}
                    />
                </div>
            </div>

            <div className='info-box flex'>
                <div className='text-wrapper'>
                    <h3>Visitors</h3>
                    <p>Here is your sites visitors statistics</p>
                </div>
                <div className='info-box chart-wrapper'>
                    <Chart
                        options={visitorsChartOptions.current}
                        series={visitorsChartOptions.current.series}
                        type={'area'}
                        width={'100%'}
                        height={300}
                        ref={visitorsChartRef}
                    />
                </div>
            </div>
            <div className='info-box flex'>
                <div className='text-wrapper'>
                    <h3>Leads</h3>
                    <p>Here is your sites leads statistics</p>
                </div>
                <div className='info-box chart-wrapper'>
                    <Chart
                        options={LeadsChartOptions.current.options}
                        series={LeadsChartOptions.current.series}
                        type={'line'}
                        width={'100%'}
                        height={300}
                        ref={leadsChartRef}
                    />
                </div>
            </div>
        </>
    )
}
