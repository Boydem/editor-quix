import './assets/styles/styles.scss'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AppHeader } from './js/pages/Home/cmps/home-header'
import { Home } from './js/pages/Home/home'
import { TemplateIndex } from './js/pages/Template/template-index'
import { AppFooter } from './js/cmps/app-footer'

function App() {
    return (
        <div className='app'>
            <AppHeader />
            <main className=' main-layout'>
                <Router>
                    {/* <AppHeader /> */}
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/create' element={<TemplateIndex />} />
                    </Routes>
                </Router>
            </main>
            <AppFooter />
        </div>
    )
}

export default App
