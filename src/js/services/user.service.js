import { showSuccessMsg } from './event-bus.service'
import { httpService } from './http.service'
import {
    socketService,
    SOCKET_EVENT_ADD_LEAD,
    SOCKET_EVENT_ADD_SCHEDULE,
    SOCKET_EVENT_ADD_SUBSCRIBE,
} from './socket.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    onGoogleLoginSignup,
}

window.userService = userService

function getUsers() {
    return httpService.get(`user`)
}


async function getById(userId) {

    const user = await httpService.get(`user/${userId}`)
    return user
}
function remove(userId) {
    // return storageService.remove(STORAGE_KEY_USER_DB, userId)
    return httpService.delete(`user/${userId}`)
}



async function login(userCred) {
    try {
        const user = await httpService.post('auth/login', userCred)
        socketService.login(user._id)
        socketService.on(SOCKET_EVENT_ADD_SUBSCRIBE, email => {
            showSuccessMsg(`New subscription!, ${email}`)
        })
        socketService.on(SOCKET_EVENT_ADD_SCHEDULE, ({ fullname, datetime }) => {
            showSuccessMsg(`New resevation by ${fullname}`)
        })
        socketService.on(SOCKET_EVENT_ADD_LEAD, data => {
            showSuccessMsg(`New lead from ${data.Name}`)
        })
        saveLocalUser(user)
        return user
    } catch (err) {
        console.log('Failed to login', err)
        throw err
    }
}

async function signup(userCred) {
    try {
        const user = await httpService.post('auth/signup', userCred)
        socketService.login(user._id)
        return saveLocalUser(user)
    } catch (err) {
        console.log('Cannot signup', err)
        throw err
    }
}
async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    socketService.logout()
    return await httpService.post('auth/logout')
}

async function onGoogleLoginSignup(userCred) {
    try {
        const user = await httpService.post('auth/login/google', userCred)
        return saveLocalUser(user)
    } catch (err) {
        console.log('Cannot login', err)
        throw new Error('Invalid username or password')
    }
}

function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}
