import { DiscoverSection } from './cmps/discover-section'
import { HeroSection } from './cmps/hero-section'
import { TemplatesSection } from './cmps/templates-section'
import { WinxSection } from './cmps/winx-section'

export function Home() {
    return (
        <main className='home full main-layout'>
            <HeroSection />
            <DiscoverSection />
            <TemplatesSection />
            <WinxSection />
        </main>
    )
}
