// import { Router } from 'react-router'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './root-cmp'
import { store } from './js/store/store'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
        {/* <Router> */}
        <App />
        {/* </Router> */}
    </Provider>
)
