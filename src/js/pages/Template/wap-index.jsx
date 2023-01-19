import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service'
import { wapService } from '../../services/wap.service'
import { DarkHeader } from './cmps/dark-header'

export function WapIndex() {
    const [waps, setWaps] = useState(null)
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
            showErrorMsg('Failed to load demos, try again later')
        }
    }

    async function onEdit(wapId) {
        try {
            let wap = await wapService.get(wapId)
            wap._id = null
            wap.owner = 'guest'
            wap = await wapService.save(wap)
            navigate(`/edit/${wap._id}`)
            showSuccessMsg('Start working on your site!')
        } catch (err) {
            console.log('failed to get wap to edit at wap-index', err)
            showErrorMsg('Failed to get your demo, please try again later')
        }
    }
    function onPreview(wapId) {
        navigate(`/preview/${wapId}`)
    }
    if (!waps) return <></>
    return (
        <>
            <DarkHeader />
            <section className='wap-index full main-layout'>
                <div className='intro full main-layout'>
                    <div className='wrapper'>
                        <h1>Choose how you want to start</h1>
                        <div className='filter'>
                            <span>Templates</span> | <span>Wirerames</span>
                        </div>
                    </div>
                </div>
                <div className='templates'>
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
