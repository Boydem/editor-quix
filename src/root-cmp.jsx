import './assets/styles/styles.scss'

import { Home } from './views/home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AppHeader } from './cmps/common/app-header'
import { AppFooter } from './cmps/common/app-footer'
import { CreateSite } from './cmps/user/create-site'
import { UserSites } from './cmps/user/user-sites'

function App() {
  return (
    <div className='app'>
      <Router>
        <AppHeader />
        <main className=' main-layout'>
          {/* <AppHeader /> */}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/sites' element={<UserSites />} />
            <Route path='/sites/create' element={<CreateSite />} />
          </Routes>
        </main>
        <AppFooter />
      </Router>
    </div>
  )
}

export default App
