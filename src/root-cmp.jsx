import './assets/styles/styles.scss'

import { Route, Routes } from 'react-router-dom'
import { Home } from './js/pages/Home/home'
import { WapIndex } from './js/pages/Template/wap-index'
import { Editor } from './js/pages/Editor/editor'
import { Preview } from './js/pages/Preview/preview'
import { LoginSignup } from './js/pages/Login/login-signup'
import { Dashboard } from './js/pages/Dashboard/dashboard'
import { UserMsg } from './js/cmps/user-msg'

// import '../node_modules/aos/dist/aos.css'

function App() {
    return (
        <div className='app'>
            <main className='main-layout'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/create' element={<WapIndex />} />
                    <Route path='/dashboard/' element={<Dashboard />} />
                    <Route path='/dashboard/:userId' element={<Dashboard />} />
                    <Route path='/edit/:wapId' element={<Editor />} />
                    <Route path='/preview/:wapId' element={<Preview />} />
                    <Route path='/:wapUrl' element={<Preview />} />
                    <Route path='/auth/:state' element={<LoginSignup />} />
                </Routes>
                <UserMsg />
                <script src='https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js'></script>
            </main>
            <link
                rel='stylesheet'
                href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css'
                integrity='sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=='
                crossOrigin='anonymous'
                referrerPolicy='no-referrer'
            />
        </div>
    )
}

export default App
