import { useNavigate } from 'react-router'
import { AppFooter } from '../../cmps/app-footer'
import { DiscoverSection } from './cmps/discover-section'
import { HeroSection } from './cmps/hero-section'
import { HomeHeader } from './cmps/home-header'
import { WapsSection } from './cmps/waps-section'
import { WebixSection } from './cmps/webix-section'

export function Home() {
    const navigate = useNavigate()
    return (
        <>
            <HomeHeader />
            <main className='home full main-layout'>
                <HeroSection navigate={navigate} />
                <DiscoverSection navigate={navigate} />
                <WapsSection navigate={navigate} />
                <WebixSection navigate={navigate} />
                <AppFooter />
            </main>
        </>
    )
}
