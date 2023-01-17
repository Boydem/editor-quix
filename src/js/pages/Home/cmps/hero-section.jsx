import heroImg from '../../../../assets/imgs/home-assets/hero-img.webp'
import heroImg2 from '../../../../assets/imgs/home-assets/hero-img2.webp'
import heroImg3 from '../../../../assets/imgs/home-assets/hero-img3.webp'
import heroImg4 from '../../../../assets/imgs/home-assets/hero-img4.webp'
import topBarImg from '../../../../assets/imgs/home-assets/top-bar-img.webp'
import heroBottom from '../../../../assets/imgs/home-assets/hero-bottom.jpg'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { Brands } from './brands'

export function HeroSection() {
    return (
        <section className='hero full main-layout'>
            <section className='hero-top full main-layout'>
                <div className='top-bar full'>
                    <img src={topBarImg} alt='topBarImg' />
                    <span className='ukraine-txt'>
                        <span className='ukraine-flag'>
                            <svg
                                preserveAspectRatio='xMidYMid meet'
                                data-bbox='0 0 33 20'
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 33 20'
                                height='20'
                                width='33'
                                data-type='color'
                                role='img'
                                aria-labelledby='svgcid--8jo9674p5van'
                            >
                                <title id='svgcid--8jo9674p5van'>Ukrainian flag</title>
                                <g>
                                    <path fill='#ffffff' d='M33 0v20H0V0h33z' data-color='1'></path>
                                    <path fill='#015BBB' d='M33 0v10H0V0h33z' data-color='2'></path>
                                    <path fill='#FFD503' d='M33 10v10H0V10h33z' data-color='3'></path>
                                </g>
                            </svg>
                        </span>
                        <span className='display-p'>WinX stands for with Ukraine.</span>
                    </span>
                </div>
                <div className='wrapper'>
                    <div className='hero-title'>
                        <h1>
                            <span className='display-1'>The new standard in website design.</span>
                        </h1>
                    </div>
                    <div className='hero-cta'>
                        <p className='hero-par'>
                            <span className='display-6'>
                                Experience a seamless design process from concept to production with responsive CSS
                                powered by smooth drag & drop
                            </span>
                        </p>
                        <button className='btn primary circled mt-5'>
                            <a href='#'>
                                <span className='display-link'>Start Creating</span>
                            </a>
                        </button>
                    </div>
                </div>
                <div className='hero-imgs full'>
                    <img src={heroImg2} alt='heroImg2' />
                    <img src={heroImg} alt='heroImg' />
                    <img src={heroImg3} alt='heroImg3' />
                    <img src={heroImg4} alt='heroImg4' />
                </div>
            </section>
            <section className='hero-bottom full main-layout'>
                <div className='main-wrapper'>
                    <div className='img-container'>
                        <img src={heroBottom} alt='topBottom' />
                    </div>
                    <div className='text-container'>
                        <h2>
                            <span className='display-2'>Advanced design features.</span>
                        </h2>
                        <p>
                            <span className='display-p'>
                                Define the exact position and behavior of every element at any viewport with flex and
                                grid layouts, custom interactions and full breakpoint control.
                            </span>
                        </p>
                        <button className='btn primary circled'>
                            <span className='display-link'>Start Creating</span>
                        </button>
                        <div>
                            <a className='link-underline' href='#'>
                                <span className='display-link'>See all design features</span>
                                <span>
                                    <AiOutlineArrowRight />
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className='brands-wrapper full main-layout'>
                    <h3>
                        <span className='display-4'>Trusted by game-changing brands.</span>
                    </h3>
                    <div className='brands'>
                        <Brands />
                    </div>
                </div>
            </section>
        </section>
    )
}
