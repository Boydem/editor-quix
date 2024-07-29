import { storageService } from './async-storage.service'
import { httpService } from './http.service'
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
    update,
    onGoogleLoginSignup,
    getDemoKanbans,
}

window.userService = userService
_createUsersForTesting()

function _createUsersForTesting() {
    if (!utilService.loadFromStorage(STORAGE_KEY_USER_DB)) {
        utilService.saveToStorage(STORAGE_KEY_USER_DB, [
            {
                fullname: 'Yaron Shapira',
                imgUrl: 'https://avatars.githubusercontent.com/u/84077420?v=4',
                password: '1',
                username: '1',
                _id: 'I6ju1',
                boards: getDemoKanbans(),
            },
        ])
    }
}

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

async function update(_id, boards) {
    // const user = await storageService.get(STORAGE_KEY_USER_DB, _id)
    // user.boards = boards
    // await storageService.put(STORAGE_KEY_USER_DB, user)

    const user = await httpService.put(`user/${_id}`, { _id, boards })
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user
}

async function login(userCred) {
    const user = await httpService.post('auth/login', userCred)
    if (user) {
        // socketService.login(user._id)
        return saveLocalUser(user)
    }
    throw new Error('Invalid username or password')
}

async function signup(userCred) {
    // if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    // const users = await storageService.query(STORAGE_KEY_USER_DB)

    // const isUsernameTaken = users.find(user => user.username === userCred.username)
    // if (isUsernameTaken) throw new Error('Username already taken')
    const user = await httpService.post('auth/signup', userCred)
    return saveLocalUser(user)
}
async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    // socketService.logout()
    return await httpService.post('auth/logout')
}

async function onGoogleLoginSignup(user) {
    const users = await getUsers()
    const isSignedup = users.find(u => u.username === user.username && user.password === u.password)
    return isSignedup ? saveLocalUser(user) : signup(user)
}

function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function getDemoKanbans() {
    return [
        {
            _id: makeId(),
            title: 'Frontend',
            items: [
                {
                    _id: makeId(),
                    txt: 'Add hamburger menu to my site',
                    createdAt: utilService.randomPastTime(),
                },
                {
                    _id: makeId(),
                    txt: 'Take pictures of my products',
                    createdAt: utilService.randomPastTime(),
                },
                {
                    _id: makeId(),
                    txt: 'Get 3D Modelist for designing my website',
                    createdAt: utilService.randomPastTime(),
                },
                {
                    _id: makeId(),
                    txt: 'Send sales data to Sara',
                    createdAt: utilService.randomPastTime(),
                },
            ],
        },
        {
            _id: makeId(),
            title: 'Clients',
            items: [
                {
                    _id: makeId(),
                    txt: 'improve chats',
                    createdAt: utilService.randomPastTime(),
                },
                {
                    _id: makeId(),
                    txt: 'FINISH FRONT END - all flow should be working with perfect logic set and ready to be user friendly',
                    createdAt: utilService.randomPastTime(),
                },
                {
                    _id: makeId(),
                    txt: 'TODAY WE CLEAN ALL COMMENTED UNUSED CODE AT 23:00 !!',
                    createdAt: utilService.randomPastTime(),
                },
            ],
        },
    ]
}
// ;(async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'puki', password:'123',score: 10000, isAdmin: false})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// })()
