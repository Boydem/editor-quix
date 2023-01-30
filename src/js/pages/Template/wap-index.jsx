import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service'
import { wapService } from '../../services/wap.service'

import { HiPlus } from 'react-icons/hi'
import { AppHeader } from '../../cmps/app-header'
import { useSelector } from 'react-redux'
import { Loader } from '../../cmps/loader'

export function WapIndex() {
    const [waps, setWaps] = useState(null)
    const user = useSelector(storeState => storeState.userModule.user)
    const navigate = useNavigate()
    useEffect(() => {
        getWaps()
    }, [])
    async function getWaps() {
        try {
            const waps = await wapService.query()
            const demoWaps = waps.filter(wap => wap.owner === 'admin')
            setWaps(demoWaps)
        } catch (err) {
            console.log('Failed to get waps in wap index', err)
            showErrorMsg('Failed to load demos. Please try again later.')
        }
    }

    async function onEdit(wapId) {
        let wap
        try {
            if (wapId === 'blank') {
                wap = await wapService.getBlankWap()
            } else {
                // wap = await wapService.get(wapId)
                wap = await wapService.getWapToEdit(wapId)
            }
            // wap._id = null
            // wap.owner = 'guest'
            // wap = await wapService.save(wap)
            navigate(`/edit/${wap._id}`)
            showSuccessMsg('Start working on your site!')
        } catch (err) {
            console.log('failed to get wap to edit at wap-index', err)
            showErrorMsg('Failed to load your template. Please try again later.')
        }
    }
    function onPreview(wapId) {
        navigate(`/preview/${wapId}`)
    }
    if (!waps) return <Loader />
    return (
        <>
            <AppHeader location={'index'} theme={'dark'} layout={'main-layout'} />
            <section className='wap-index full main-layout'>
                <div className='intro full main-layout'>
                    <div className='wrapper'>
                        <h1>Kickstart your website with our templates</h1>
                        {/* <h1>Select the perfect starting point for your website</h1> */}
                    </div>
                </div>
                <div className='templates'>
                    <article className='template'>
                        <div className='img-container blank-template'>
                            <div onClick={() => onEdit('blank')}>
                                <HiPlus size={'2.5rem'} />
                            </div>
                        </div>
                        <div className='text-container'>
                            <div className='template-title text-bold'>Blank Canvas</div>
                            <p className='template-categories text-muted'>Start from scratch</p>
                        </div>
                    </article>
                    {waps.map(wap => (
                        <article className='template' key={wap._id}>
                            <div className='img-container'>
                                <img src={wap.thumbnail} alt='templateImg2' />
                                <div className='actions'>
                                    <button className='btn btn-template' onClick={() => onEdit(wap._id)}>
                                        Edit
                                    </button>
                                    <button className='btn btn-template' onClick={() => onPreview(wap._id)}>
                                        View
                                    </button>
                                </div>
                            </div>
                            <div className='text-container'>
                                <div className='template-title text-bold'>{wap.title}</div>
                                <p className='template-categories text-muted'>Sticky / Lightbox / Transparent Video</p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </>
    )
}
