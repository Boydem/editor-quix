import WinxSectionBg from '../../../../assets/imgs/home-assets/winx-section-bg.webp'

export function WinxSection() {
    return (
        <section className='winx-section full'>
            <img className='bg' src={WinxSectionBg} alt='WinxSectionBg' />
            <div className='sides-svg side-right-svg'>
                <svg
                    preserveAspectRatio='xMidYMid meet'
                    data-bbox='1.61 5 337.89 47'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 344 57'
                    height='57'
                    width='344'
                    data-type='ugc'
                    role='presentation'
                    aria-hidden='true'
                >
                    <g stroke='#FFFFFF' fill-rule='evenodd'>
                        <path fill='none' d='M339.5 5v47' stroke-width='9' stroke-linecap='round'></path>
                        <path
                            stroke-dasharray='4,2'
                            stroke-width='2.5'
                            d='M333.39 27.56c9.663.333-100.93.333-331.78 0'
                            fill='none'
                        ></path>
                    </g>
                </svg>
            </div>
            <div className='text'>
                <span className='text-xxl'>Winx</span>
                <h3>
                    <span className='display-3'>The rest is up to you.</span>
                </h3>
                <button className='btn primary circled'>
                    <span className='display-link'>Start Creating</span>
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
                    data-type='ugc'
                    role='presentation'
                    aria-hidden='true'
                >
                    <g stroke='#FFFFFF' fill-rule='evenodd'>
                        <path fill='none' d='M4.5 5v47' stroke-width='9' stroke-linecap='round'></path>
                        <path
                            stroke-dasharray='4,2'
                            stroke-width='2.5'
                            d='M10.61 27.56c-9.663.333 100.93.333 331.78 0'
                            fill='none'
                        ></path>
                    </g>
                </svg>
            </div>
        </section>
    )
}
