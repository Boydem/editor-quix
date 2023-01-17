import templateImg2 from '../../../assets/imgs/home-assets/templates2.webp'
import { AppHeader } from '../../cmps/app-header'
import { DarkHeader } from './cmps/dark-header'

export function TemplateIndex() {
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
                    {Array.apply(null, { length: 12 }).map(() => (
                        <article className='template'>
                            <div className='img-container'>
                                <img src={templateImg2} alt='templateImg2' />
                                <div className='actions'>
                                    <button className='btn btn-template'>Edit</button>
                                    <button className='btn btn-template'>View</button>
                                </div>
                            </div>
                            <div className='text-container'>
                                <div className='template-title text-bold'>SAAS Company</div>
                                <p className='template-categories text-muted'>Sticky / Lightbox / Transparent Video</p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </>
    )
}
