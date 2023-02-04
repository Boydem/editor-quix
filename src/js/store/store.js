import { combineReducers, legacy_createStore } from 'redux'

import { userReducer } from './user/user.reducer.js'
import { systemReducer } from './system.reducer'
import { wapReducer } from './wap/wap.reducer.js'

const rootReducer = combineReducers({
    userModule: userReducer,
    systemModule: systemReducer,
    wapModule: wapReducer,
})

const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
    : undefined
export const store = legacy_createStore(rootReducer, middleware)


