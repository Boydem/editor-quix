export function WapsSection({ navigate }) {
    return (
        <section className='waps-section full main-layout'>
            <div className='wrapper'>
                <div className='title-container' id='waps-section'>
                    <h2>
                        <span className='display-2'>Website templates by our in-house design studio.</span>
                    </h2>
                </div>
                <div className='cta-container'>
                    <p>
                        <span className='display-p'>
                            Accelerate your next project or get inspired and design from a blank canvas.
                        </span>
                    </p>
                    <button className='btn circled secondary' onClick={() => navigate('/create')}>
                        <span className='display-link'>Start Demo</span>
                    </button>
                </div>
            </div>
            <div className='slider'>
                <div className='slider-item'>
                    <div className='outer yosemite'>
                        <div className='dot red'></div>
                        <div className='dot amber'></div>
                        <div className='dot green'></div>
                    </div>

                    <img
                        className='wap-img'
                        src='https://res.cloudinary.com/dotasvsuv/image/upload/v1674573127/127.0.0.1_3000_preview_2dVX0X_djlrz2.jpg'
                        alt='templateImg'
                    />
                </div>
                <div className='slider-item'>
                    <div className='outer yosemite'>
                        <div className='dot red'></div>
                        <div className='dot amber'></div>
                        <div className='dot green'></div>
                    </div>

                    <img
                        className='wap-img'
                        src='https://res.cloudinary.com/dotasvsuv/image/upload/v1674479605/wap-7-full-thumbnail_muhg8r.jpg'
                        alt='templateImg'
                    />
                </div>

                <div className='slider-item'>
                    <div className='outer yosemite'>
                        <div className='dot red'></div>
                        <div className='dot amber'></div>
                        <div className='dot green'></div>
                    </div>

                    <img
                        className='wap-img'
                        src='https://res.cloudinary.com/dotasvsuv/image/upload/v1674060299/wap-2-full-size-thumbnail_gth6ya.jpg'
                        alt='templateImg'
                    />
                </div>
                <div className='slider-item'>
                    <div className='outer yosemite'>
                        <div className='dot red'></div>
                        <div className='dot amber'></div>
                        <div className='dot green'></div>
                    </div>

                    <img
                        className='wap-img'
                        src='https://res.cloudinary.com/dotasvsuv/image/upload/v1674060312/wap-2-full-size-thumbnail_qfbobw.jpg'
                        alt='templateImg'
                    />
                </div>
            </div>
        </section>
    )
}
