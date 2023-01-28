import { showSuccessMsg } from './event-bus.service'
import { httpService } from './http.service'
import {
    socketService,
    SOCKET_EVENT_ADD_LEAD,
    SOCKET_EVENT_ADD_SCHEDULE,
    SOCKET_EVENT_ADD_SUBSCRIBE,
} from './socket.service'
// import { store } from '../store/store'
// import { socketService, SOCKET_EVENT_USER_UPDATED, SOCKET_EMIT_USER_WATCH } from './socket.service'
// import { showSuccessMsg } from '../services/event-bus.service'
import { makeId, utilService } from './util.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const STORAGE_KEY_USER_DB = 'userDB'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    // update,
    onGoogleLoginSignup,
}

window.userService = userService
// _createUsersForTesting()

// async function _createUsersForTesting() {
//     const userCred = {
//         fullname: 'Yaron Shapira',
//         imgUrl: 'https://avatars.githubusercontent.com/u/84077420?v=4',
//         password: '1',
//         username: '1',
//         _id: 'I6ju1',
//     }
//     try {
//         const user = await httpService.post('auth/signup', userCred)
//         return saveLocalUser(user)
//     } catch (err) {
//         console.log(err)
//         throw err
//     }
// }

function getUsers() {
    // return storageService.query(STORAGE_KEY_USER_DB)
    return httpService.get(`user`)
}

// function onUserUpdate(user) {
//     showSuccessMsg(`This user ${user.fullname} just got updated from socket, new score: ${user.score}`)
//     store.dispatch({ type: 'SET_WATCHED_USER', user })
// }

async function getById(userId) {
    // return await storageService.get(STORAGE_KEY_USER_DB, userId)

    const user = await httpService.get(`user/${userId}`)
    // socketService.emit(SOCKET_EMIT_USER_WATCH, userId)
    // socketService.off(SOCKET_EVENT_USER_UPDATED, onUserUpdate)
    // socketService.on(SOCKET_EVENT_USER_UPDATED, onUserUpdate)
    return user
}
function remove(userId) {
    // return storageService.remove(STORAGE_KEY_USER_DB, userId)
    return httpService.delete(`user/${userId}`)
}

// async function update(_id, boards) {
//     // const user = await storageService.get(STORAGE_KEY_USER_DB, _id)
//     // user.boards = boards
//     // await storageService.put(STORAGE_KEY_USER_DB, user)

//     const user = await httpService.put(`user/${_id}`, { _id, boards })
//     // Handle case in which admin updates other user's details
//     if (getLoggedinUser()._id === user._id) saveLocalUser(user)
//     return user
// }

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
    // if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    // const users = await storageService.query(STORAGE_KEY_USER_DB)

    // const isUsernameTaken = users.find(user => user.username === userCred.username)
    // if (isUsernameTaken) throw new Error('Username already taken')
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
        // socketService.login(user._id)
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

// ;(async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'puki', password:'123',score: 10000, isAdmin: false})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// })()
