import templatesGallery from '../../../../assets/imgs/home-assets/gallery.webp'

export function DiscoverSection({ navigate }) {
    return (
        <section className='discover-section full'>
            <div className='scrolled-bar full'>
                <h1>
                    <span className='display-1'>Discover extraordinary projects brought to life on quix.</span>
                </h1>
                <button className='btn primary circled' onClick={() => navigate('/create')}>
                    <span className='display-link'>Start Creating</span>
                </button>
                <a href='#waps-section'>
                    <span className='display-link'>Explore Showroom</span>
                </a>
                <div></div>
            </div>
            <div className='templates-gallery'>
                <img src={templatesGallery} alt='templatesGallery' />
            </div>
        </section>
    )
}
