import heroImg5 from '../../../../assets/imgs/heroImg.png'
import heroImg from '../../../../assets/imgs/home-assets/hero-img.webp'
import heroImg2 from '../../../../assets/imgs/home-assets/hero-img2.webp'
import heroImg3 from '../../../../assets/imgs/home-assets/hero-img3.webp'
import heroImg4 from '../../../../assets/imgs/home-assets/hero-img4.webp'
import topBarImg from '../../../../assets/imgs/home-assets/top-bar-img.webp'
import heroBottom from '../../../../assets/imgs/home-assets/hero-bottom.jpg'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { Brands } from './brands'

export function HeroSection({ navigate }) {
    return (
        <section className='hero full main-layout'>
            <section className='hero-top full main-layout'>
                <div className='wrapper'>
                    <div className='hero-title'>
                        <h1>
                            <span className='display-1'>Websites that provide business solutions quickly</span>
                        </h1>
                    </div>
                    <div className='hero-cta'>
                        <p className='hero-par'>
                            <span className='display-6'>
                                Discover the platform that gives you the freedom to create, design, manage and develop
                                your web presence exactly the way you want.
                            </span>
                        </p>
                        <button className='btn primary circled mt-5' onClick={() => navigate('/create')}>
                            <a className='disabled' href='#'>
                                <span className='display-link'>Start Demo</span>
                            </a>
                        </button>
                    </div>
                </div>
                <div className='hero-imgs full'>
                    <img src={heroImg2} alt='heroImg2' />
                    <img className='inner-img' src={heroImg5} alt='heroImg' />
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
                        <button className='btn primary circled' onClick={() => navigate('/create')}>
                            <span className='display-link'>Start Demo</span>
                        </button>
                        <div>
                            <a className='link-underline' href='#waps-section'>
                                <span className='display-link'>See all design features</span>
                                <span className='arrow'>
                                    <AiOutlineArrowRight />
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className='brands-wrapper'>
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
