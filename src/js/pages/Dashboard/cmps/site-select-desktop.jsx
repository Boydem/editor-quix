import explorerSVG from '../../../../assets/imgs/dashboard-assets/explorer.svg'
import quixIcon from '../../../../assets/imgs/quix-icon-darkblue.png'
import { utilService } from '../../../services/util.service'

export function SiteSelectDesktop({ user, currSite, onChangeSite, sortedEvents }) {
    return (
        <>
            <div className='info-box info-box-2'>
                <div className='text-wrapper'>
                    <h3>Currently viewing</h3>
                    <div className='flex align-center'>
                        <img src={explorerSVG} alt='explorerSVG' /> <h4>{currSite?.title}</h4>
                    </div>
                </div>
            </div>
            <div className='info-box info-box-rows my-sites'>
                <div className='list-item-preview header'>
                    <h4>My sites</h4>
                </div>
                {user?.sites?.map(site => (
                    <article
                        key={site._id}
                        className={`list-item-preview ${currSite?._id === site._id ? 'active' : ''}`}
                        onClick={() => onChangeSite(site._id)}
                    >
                        <div className='item'>
                            <img src={quixIcon} className='thumbnail' alt='imgUrl' />
                            <span>{site.title}</span>
                        </div>
                    </article>
                ))}
            </div>
            <div className='last-messages info-box info-box-rows my-sites'>
                <div className='list-item-preview header'>
                    <h4>Latest Events</h4>
                </div>
                {sortedEvents?.map((event, idx) => (
                    <article key={idx} className='list-item-preview'>
                        <div className='item'>
                            <img className='user-avatar' src={user.imgUrl} alt='explorerSVG' />
                            <span className='user-name'>{user.fullname}</span>
                            <div className='message-body'>
                                <p>{event['key'] === 'msgsTimestamps' && 'A user just sent a message!'}</p>
                                <p>{event['key'] === 'subscribersTimestamps' && 'A user just subscribed!'}</p>
                                <p>{event['key'] === 'leadTimestamps' && 'A user just left their information!'}</p>
                            </div>
                            <div className='time-ago flex'>{utilService.formatTimeAgo(event.timestamp)}</div>
                        </div>
                    </article>
                ))}
            </div>
        </>
    )
}
