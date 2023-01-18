import './assets/styles/styles.scss'

import { Route, Routes } from 'react-router-dom'
import { Home } from './js/pages/Home/home'
import { TemplateIndex } from './js/pages/Template/template-index'
import { Editor } from './js/pages/Editor/editor'
import { EditorPreview } from './js/pages/Editor/cmps/editor-preview'
import { Preview } from './js/pages/Preview/preview'

function App() {
    return (
        <div className='app'>
            <main className='main-layout'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/create' element={<TemplateIndex />} />
                    <Route path='/edit' element={<Editor />} />
                    <Route path='/edit/:wapId' element={<Editor />} />
                    <Route path='/preview/:wapId' element={<Preview />} />
                </Routes>
            </main>
        </div>
    )
}

export default App
