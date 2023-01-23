import diamondSVG from '../../../../assets/imgs/dashboard-assets/diamonds.svg'
import explorerSVG from '../../../../assets/imgs/dashboard-assets/explorer.svg'
import { BsTrash } from 'react-icons/bs'
import { BsPencil } from 'react-icons/bs'
import Chart from 'react-apexcharts'

export function Forms({ user }) {
    return (
        <div className='forms layout-wrapper'>
            <div className='header'>
                <h2>Forms manager</h2>
                <p>Exclusive tool designed to help you build client sites and scale your business.</p>
            </div>
            <div className='col full'>
                <div className='info-box table-box'>
                    <div className='header'>
                        <div className='text-wrapper'>
                            <h3>Subscribers</h3>
                        </div>
                        <button className='btn-send-msg'>Message all</button>
                    </div>
                    <div className='leads-table'>
                        <ul className='table-header container'>
                            <li>Email</li>
                            <li>Actions</li>
                        </ul>
                        <ul className='table-row container'>
                            <li className='lead'>Noyemdahan@gmail.com</li>
                            <li className='actions'>
                                <span className='time-ago'>2 days ago</span>{' '}
                                <button className='btn-send-msg'>Message</button>
                            </li>
                        </ul>
                        <ul className='table-row container'>
                            <li className='lead'>Muki@gmail.com</li>
                            <li className='actions'>
                                <span className='time-ago'>3 days ago</span>{' '}
                                <button className='btn-send-msg'>Message</button>
                            </li>
                        </ul>
                        <ul className='table-row container'>
                            <li className='lead'>PukiGa@gmail.com</li>
                            <li className='actions'>
                                <span className='time-ago'>1 week ago</span>{' '}
                                <button className='btn-send-msg'>Message</button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='info-box table-box'>
                    <div className='header'>
                        <div className='text-wrapper'>
                            <h3>My forms</h3>
                        </div>
                        <button className='btn-send-msg'>Download CSV</button>
                    </div>
                    <div className='leads-table'>
                        <ul className='table-row table-header container'>
                            <li className='col'>Email</li>
                            <li className='col'>City</li>
                            <li className='col'>Age</li>
                            <li className='col'>Service</li>
                        </ul>
                        <ul className='table-row container'>
                            <li className='col'>Yotamos@gmail.com</li>
                            <li className='col'>Beer Sheva</li>
                            <li className='col'>31</li>
                            <li className='col'>yesterday</li>
                        </ul>
                        <ul className='table-row container'>
                            <li className='col'>Gili3000@gmail.com</li>
                            <li className='col'>Tel aviv</li>
                            <li className='col'>26</li>
                            <li className='col'>2 days ago</li>
                        </ul>
                        <ul className='table-row container'>
                            <li className='col'>Saritt123@gmail.com</li>
                            <li className='col'>Herzeliya</li>
                            <li className='col'>26</li>
                            <li className='col'>2 days ago</li>
                        </ul>
                        <ul className='table-row container'>
                            <li className='col'>TheBoyZfan@gmail.com</li>
                            <li className='col'>Natanya</li>
                            <li className='col'>26</li>
                            <li className='col'>2 days ago</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
