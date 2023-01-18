import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import templateImg2 from '../../../assets/imgs/home-assets/templates2.webp'
import { AppHeader } from '../../cmps/app-header'
import { utilService } from '../../services/util.service'
import { wapService } from '../../services/wap.service'
import { DarkHeader } from './cmps/dark-header'

export function TemplateIndex() {
    const [waps, setWaps] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {
        getWaps()
    }, [])
    async function getWaps() {
        const waps = await wapService.query()
        const templateWaps = waps.filter(wap => wap.owner === 'admin')
        setWaps(templateWaps)
    }

    async function onEdit(wapId) {
        let template = await wapService.get(wapId)
        template._id = null
        template.owner = 'guest'
        template = await wapService.save(template)
        navigate(`/edit/${template._id}`)
    }
    if (!waps) return <></>
    return (
        <>
            <DarkHeader />
            <section className='template-index full main-layout'>
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
                                    <button className='btn btn-template'>View</button>
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
