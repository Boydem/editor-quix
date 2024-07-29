import { useState } from 'react'
import { GrClose } from 'react-icons/gr'
import { Link } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg } from '../../../../services/event-bus.service'
import { saveWap } from '../../../../store/wap/wap.action'
import { PublishLoginSignup } from './publish-login'

export function PublishModal({ wap, user, closeModal, isPublishing, isRenaming, setIsRenaming }) {
    const [wapUrlToEdit, setWapUrlToEdit] = useState({ publishUrl: '', title: '' })
    const [isPublished, setIsPublished] = useState(wap.url ? true : false)
    function handleFocus(ev) {
        ev.target.select()
    }
    async function publishWap() {
        if (!wapUrlToEdit.publishUrl || !wapUrlToEdit.title) {
            showErrorMsg(`Please fill all forms!`)
            return
        }
        try {
            // const isUrlFree = await wapService.isWapUrlFree(wapUrlToEdit.publishUrl)
            // if (!isUrlFree) {
            //     showErrorMsg(`URL is already taken!`)
            //     return
            // }
            wap.owner = user._id
            wap.title = wapUrlToEdit.title
            wap.url = wapUrlToEdit.publishUrl
            await saveWap(wap)
            setIsRenaming(false)
            setIsPublished(true)
            // navigate(`/${wapUrlToEdit.publishUrl}`)
            showSuccessMsg('Your site has been published!')
        } catch (err) {
            console.log(err)
            showErrorMsg(`Url is already taken.`)
        }
    }
    function handleChange(ev) {
        const value = ev.target.value
        const field = ev.target.name
        setWapUrlToEdit(prev => ({ ...prev, [field]: value }))
    }

    return (
        <section className={`publish-modal ${isPublishing ? 'open' : ''}`}>
            <div className='container'>
                <div onClick={closeModal} className='close-btn'>
                    <GrClose />
                </div>
                {!isPublished || isRenaming ? (
                    <div className='content-container'>
                        <div className='intro-text flex column justify-center align-center'>
                            <h4> {!user ? 'You must be a signed up user' : 'Choose a domain before you publish'}</h4>
                            <p>
                                {!user
                                    ? 'In order to publish your site you have to own quix account'
                                    : "The domain you select will be your site's address"}
                            </p>
                        </div>
                        {!user ? (
                            <PublishLoginSignup />
                        ) : (
                            <>
                                <div className='free-domain'>
                                    <h5>Get a free quix domain</h5>
                                    <div className='link-preview-container'>
                                        <div className='dots'>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                        <div className='link-preview'>
                                            <span>http://www.quix.io/</span>
                                            <input
                                                type='text'
                                                value={wapUrlToEdit.publishUrl || ''}
                                                placeholder={'BeautifulSite'}
                                                autoFocus={isPublishing ? true : false}
                                                onFocus={handleFocus}
                                                onChange={handleChange}
                                                name='publishUrl'
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='free-domain'>
                                    <h5>Enter your site name</h5>
                                    <div className='link-preview-container'>
                                        <div className='site-img'>
                                            <img src={wap.thumbnail} alt='imgUrl' />
                                        </div>
                                        <div className='link-preview site-name'>
                                            <span className='bold'>Enter your site name</span>
                                            <input
                                                type='text'
                                                value={wapUrlToEdit.title || ''}
                                                placeholder={'My beautiful site'}
                                                onChange={handleChange}
                                                name='title'
                                                id='title'
                                            />
                                        </div>
                                    </div>
                                </div>
                                <button className='app-btn primary' onClick={publishWap}>
                                    Save & Continue
                                </button>
                            </>
                        )}
                    </div>
                ) : (
                    <div className='content-container'>
                        <h4>Congratulations!</h4>
                        <p>Your site is published and live online</p>

                        <div className='seperator'></div>
                        <h5 className='secondary-title'>Choose where next</h5>
                        <div className='where-next-btns'>
                            <button className='app-btn primary'>
                                <Link to={`/dashboard/${user?._id}`}>Admin Panel</Link>
                            </button>
                            <button className='app-btn secondary'>
                                <Link to={`/${wap.url}`}>View site</Link>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
