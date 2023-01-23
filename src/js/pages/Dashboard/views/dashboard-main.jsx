import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { wapService } from '../../../services/wap.service'
import { saveWap } from '../../../store/wap/wap.action'
import { userService } from '../../../services/user.service'
import { LineChart } from '.././cmps/line-chart'
import diamondSVG from '../../../../assets/imgs/dashboard-assets/diamonds.svg'
import explorerSVG from '../../../../assets/imgs/dashboard-assets/explorer.svg'
import { BsTrash } from 'react-icons/bs'
import { BsPencil } from 'react-icons/bs'
import Chart from 'react-apexcharts'

export function DashboardMain({ user }) {
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
    return (
        <div className='layout-wrapper'>
            <div className='header'>
                <h2>Hello, {user.fullname}</h2>
                <p>Access exclusive tools to help you build client sites and scale your business.</p>
            </div>
            <div className='col col-left'>
                <div className='info-box'>
                    <div className='text-wrapper'>
                        <h3>Welcome to your Partner Dashboard</h3>
                        <p>
                            Advance to new levels as you earn points for creating Premium sites. For each level you
                            reach, you unlock new benefits.
                        </p>
                    </div>
                    <div className='img-wrapper'>
                        <img src={diamondSVG} alt='diamonds' />
                    </div>
                </div>
                <div className='info-box'>
                    <div className='text-wrapper'>
                        <h3>Last Messages</h3>
                        <p>Advance to new levels as you earn points for creating Premium sites</p>
                    </div>
                    <div className='last-messages info-box info-box-rows'>
                        {'1,2,3'.split(',').map((userSite, idx) => (
                            <article key={userSite} className='wap-preview'>
                                <div className='item'>
                                    <img className='user-avatar' src={user.imgUrl} alt='explorerSVG' />
                                    <span className='user-name'>
                                        {(idx === 0 && 'Kuki') || (idx === 1 && 'Muki') || (idx === 2 && 'Puki')}
                                    </span>
                                    <div className='message-body'>
                                        <p>
                                            Lorem ipsum, commodi dolor sit amet consectetur adipisicing elit. Facilis
                                            ratione.
                                        </p>
                                    </div>
                                    <div className='time-ago flex'>2 days ago</div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
                <div className='info-box charts'>
                    <div>
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
                    <div>
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
                </div>
            </div>
            <div className='col col-right'>
                <div className='info-box info-box-2'>
                    <div className='text-wrapper'>
                        <h3>Your Partner level</h3>
                        <div className='level flex align-center'>
                            <img src={explorerSVG} alt='explorerSVG' /> <h2>Explorer</h2>
                        </div>
                        <p>You have 35 points. Only 400 points until you reach the next level.</p>
                    </div>
                </div>
                <div className='info-box info-box-rows my-sites'>
                    <div className='wap-preview header'>
                        <h3>My sites</h3>
                    </div>
                    {'1,2,3'.split(',').map(userSite => (
                        <article key={userSite} className='wap-preview'>
                            <div className='item'>
                                <img src={explorerSVG} alt='explorerSVG' />
                                <span>{'My Site ' + userSite}</span>
                                <div className='actions flex'>
                                    <button data-tooltip='Edit' className='tool'>
                                        <BsPencil />
                                    </button>
                                    <button data-tooltip='Trash' className='tool'>
                                        <BsTrash />
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    )
}
