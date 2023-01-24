import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { wapService } from '../../../services/wap.service'
import { saveWap } from '../../../store/wap/wap.action'
import { userService } from '../../../services/user.service'
import { LineChart } from '.././cmps/line-chart'

import diamondSVG from '../../../../assets/imgs/dashboard-assets/diamonds.svg'

import Chart from 'react-apexcharts'

export function DashboardMain({ user, onEditSite }) {
    let SubsChartOptions = useRef({
        series: [
            {
                data: [44, 55, 41, 64, 22, 43, 21],
            },
            {
                data: [53, 32, 33, 52, 13, 44, 32],
            },
        ],
        options: {
            chart: {
                type: 'bar',
                height: 430,
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                    dataLabels: {
                        position: 'top',
                    },
                },
            },
            dataLabels: {
                enabled: true,
                offsetX: -6,
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
                categories: [2001, 2002, 2003, 2004, 2005, 2006, 2007],
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
                        options={SubsChartOptions.current}
                        series={SubsChartOptions.current.series}
                        type={'bar'}
                        width={'100%'}
                        height={300}
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
                    />
                </div>
            </div>
        </>
    )
}
