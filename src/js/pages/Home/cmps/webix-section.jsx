import WebixSectionBg from '../../../../assets/imgs/home-assets/webix-section-bg.webp'

export function WebixSection({ navigate }) {
    return (
        <section className='webix-section full'>
            <img className='bg' src={WebixSectionBg} alt='WebixSectionBg' />
            <div className='sides-svg side-right-svg'>
                <svg
                    preserveAspectRatio='xMidYMid meet'
                    data-bbox='1.61 5 337.89 47'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 344 57'
                    height='57'
                    width='344'
                    datatype='ugc'
                    role='presentation'
                    aria-hidden='true'
                >
                    <g stroke='#FFFFFF' fillRule='evenodd'>
                        <path fill='none' d='M339.5 5v47' strokeWidth='9' strokeLinecap='round'></path>
                        <path
                            strokeDasharray='4,2'
                            strokeWidth='2.5'
                            d='M333.39 27.56c9.663.333-100.93.333-331.78 0'
                            fill='none'
                        ></path>
                    </g>
                </svg>
            </div>
            <div className='text'>
                <span className='text-xxl'>quix</span>
                <h3>
                    <span className='display-3'>The rest is up to you.</span>
                </h3>
                <button className='btn primary circled' onClick={() => navigate('/create')}>
                    <span className='display-link'>Start Demo</span>
                </button>
            </div>
            <div className='sides-svg sides-left-svg'>
                <svg
                    preserveAspectRatio='xMidYMid meet'
                    data-bbox='4.5 5 337.89 47'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 344 57'
                    height='57'
                    width='344'
                    datatype='ugc'
                    role='presentation'
                    aria-hidden='true'
                >
                    <g stroke='#FFFFFF' fillRule='evenodd'>
                        <path fill='none' d='M4.5 5v47' strokeWidth='9' strokeLinecap='round'></path>
                        <path
                            strokeDasharray='4,2'
                            strokeWidth='2.5'
                            d='M10.61 27.56c-9.663.333 100.93.333 331.78 0'
                            fill='none'
                        ></path>
                    </g>
                </svg>
            </div>
        </section>
    )
}
