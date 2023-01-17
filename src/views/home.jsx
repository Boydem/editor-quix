import { DiscoverSection } from '../cmps/home/discover-section'
import { HeroSection } from '../cmps/home/hero-section'
import { TemplatesSection } from '../cmps/home/templates-section'
import { WinxSection } from '../cmps/home/winx-section'

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
