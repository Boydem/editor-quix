import explorerSVG from '../../../../assets/imgs/dashboard-assets/explorer.svg'
import { BsThreeDotsVertical } from 'react-icons/bs'

export function SiteSelectDesktop({ user }) {
    return (
        <>
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
                {user?.sites?.map(site => (
                    <article key={site._id} className='wap-preview'>
                        <div className='item'>
                            <img src={explorerSVG} alt='explorerSVG' />
                            <span>{site.title}</span>
                            <div className='actions flex'>
                                <button className='tool'>
                                    <BsThreeDotsVertical />
                                </button>
                                {/* <button data-tooltip='Edit' className='tool'>
                          <BsPencil />
                          </button>
                          <button data-tooltip='Trash' className='tool'>
                          <BsTrash />
                        </button> */}
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </>
    )
}
