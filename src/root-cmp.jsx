import './assets/styles/styles.scss'

import { Route, Routes } from 'react-router-dom'
import { Home } from './js/pages/Home/home'
import { WapIndex } from './js/pages/Template/wap-index'
import { Editor } from './js/pages/Editor/editor'
import { Preview } from './js/pages/Preview/preview'
import { LoginSignup } from './js/pages/Login/login-signup'
import { Dashboard } from './js/pages/Dashboard/dashboard'

function App() {
    return (
        <div className='app'>
            <main className='main-layout'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/create' element={<WapIndex />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/edit/:wapId' element={<Editor />} />
                    <Route path='/preview/:wapId' element={<Preview />} />
                    <Route path='/:wapUrl' element={<Preview />} />
                    <Route path='/auth' element={<LoginSignup />} />
                </Routes>
            </main>
        </div>
    )
}

export default App
