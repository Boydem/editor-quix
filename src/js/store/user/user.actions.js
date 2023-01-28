import { store } from '../store.js'
import { wapService } from '../../services/wap.service.js'
import { userService } from '../../services/user.service.js'
import { SET_CURR_SITE, SET_USER } from './user.reducer.js'

// import { showErrorMsg } from '../services/event-bus.service.js'

export async function loadUsers() {
    try {
        store.dispatch({ type: 'LOADING_START' })
        const users = await userService.getUsers()
        store.dispatch({ type: 'SET_USERS', users })
    } catch (err) {
        console.log('UserActions: err in loadUsers', err)
    } finally {
        store.dispatch({ type: 'LOADING_DONE' })
    }
}

export async function setUser(userId) {
    try {
        store.dispatch({ type: 'LOADING_START' })
        // Will become one request with backend
        const user = await userService.getById(userId)
        user.sites = await wapService.query({ owner: user._id })
        store.dispatch({ type: SET_USER, user })
        return user
    } catch (err) {
        console.error('UserActions: err in loadUser', err)
        throw err
    } finally {
        store.dispatch({ type: 'LOADING_DONE' })
    }
}
export async function setUserSites(user) {
    try {
        store.dispatch({ type: 'LOADING_START' })
        user.sites = await wapService.query({ owner: user._id })
        store.dispatch({ type: SET_USER, user })
        return user
    } catch (err) {
        console.error('UserActions: err in loadUser', err)
        throw err
    } finally {
        store.dispatch({ type: 'LOADING_DONE' })
    }
}

export async function removeUser(userId) {
    try {
        await userService.remove(userId)
        store.dispatch({ type: 'REMOVE_USER', userId })
    } catch (err) {
        console.log('UserActions: err in removeUser', err)
    }
}

export async function login(credentials) {
    try {
        const user = await userService.login(credentials)
        store.dispatch({
            type: 'SET_USER',
            user,
        })

        return user
    } catch (err) {
        console.log('Cannot login', err)
        throw err
    }
}

export async function signup(credentials) {
    try {
        const user = await userService.signup(credentials)
        store.dispatch({
            type: 'SET_USER',
            user,
        })
        return user
    } catch (err) {
        console.log('Cannot signup', err)
        throw err
    }
}

export async function setCurrSite(currSite) {
    store.dispatch({
        type: SET_CURR_SITE,
        currSite,
    })
}

export async function logout() {
    try {
        await userService.logout()
        store.dispatch({
            type: 'SET_USER',
            user: null,
        })
    } catch (err) {
        console.log('Cannot logout', err)
        throw err
    }
}

export async function onGoogleLogin(credentials) {
    try {
        const user = await userService.onGoogleLoginSignup(credentials)
        store.dispatch({ type: 'SET_USER', user })
        return user
    } catch (err) {
        console.log('Cannot login with google', err)
        throw err
    }
}

export async function updateUser(user, boardsToUpdate) {
    try {
        const updatedUser = await userService.update(user._id, boardsToUpdate)
        store.dispatch({ type: 'SET_USER', user: updatedUser })
    } catch (err) {
        console.log('Cannot update user', err)
        throw err
    }
}
