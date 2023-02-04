import { storageService } from './async-storage.service'
import { store } from '../store/store'
import { showSuccessMsg } from '../services/event-bus.service'
import {  utilService } from './util.service'

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
            },
        ])
    }
}

function getUsers() {
    return storageService.query(STORAGE_KEY_USER_DB)
}

async function getById(userId) {
    return await storageService.get(STORAGE_KEY_USER_DB, userId)

}
function remove(userId) {
    return storageService.remove(STORAGE_KEY_USER_DB, userId)
}

async function update(_id, boards) {
    const user = await storageService.get(STORAGE_KEY_USER_DB, _id)
    user.boards = boards
    await storageService.put(STORAGE_KEY_USER_DB, user)

    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user
}

async function login(userCred) {
    const users = await storageService.query(STORAGE_KEY_USER_DB)
    const user = users.find(user => user.username === userCred.username)
    if (user) {
        return saveLocalUser(user)
    }
    throw new Error('Invalid username or password')
}
async function signup(userCred) {
    const users = await storageService.query(STORAGE_KEY_USER_DB)

    const isUsernameTaken = users.find(user => user.username === userCred.username)
    if (isUsernameTaken) throw new Error('Username already taken')
    const user = await storageService.post(STORAGE_KEY_USER_DB, userCred)
    return saveLocalUser(user)
}
async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
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

