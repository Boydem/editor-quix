import templatesGallery from '../../../../assets/imgs/home-assets/gallery.webp'

export function DiscoverSection() {
    return (
        <section className='discover-section full'>
            <div className='scrolled-bar full'>
                <h1>
                    <span className='display-1'>Discover extraordinary projects brought to life on Webix.</span>
                </h1>
                <button className='btn primary circled'>
                    <span className='display-link'>Start Creating</span>
                </button>
                <a href='#'>
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
