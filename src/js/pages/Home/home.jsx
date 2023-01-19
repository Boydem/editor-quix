import { AppFooter } from '../../cmps/app-footer'
import { DiscoverSection } from './cmps/discover-section'
import { HeroSection } from './cmps/hero-section'
import { HomeHeader } from './cmps/home-header'
import { WapsSection } from './cmps/waps-section'
import { WinxSection } from './cmps/winx-section'

export function Home() {
    return (
        <>
            <HomeHeader />
            <main className='home full main-layout'>
                <HeroSection />
                <DiscoverSection />
                <WapsSection />
                <WinxSection />
            </main>
            <AppFooter />
        </>
    )
}
