const Cryptr = require('cryptr')
const bcrypt = require('bcrypt')
const userService = require('../user/user.service')
const wapService = require('../wap/wap.service')
const logger = require('../../services/logger.service')
const cryptr = new Cryptr(process.env.SECRET1 || 'Secret-Puk-1234')

module.exports = {
    signup,
    login,
    // googleLoginSignup,
    getLoginToken,
    validateToken,
}

async function login(username, password) {
    logger.debug(`auth.service - login with username: ${username}`)

    const user = await userService.getByUsername(username)
    // console.log(user)
    if (!user) return Promise.reject('Invalid username or password')
    // TODO: un-comment for real login
    const match = await bcrypt.compare(password, user.password)
    if (!match) return Promise.reject('Invalid username or password')
    const userSites = await wapService.query({ owner: user._id.toString() })
    if (userSites) user.sites = userSites
    console.log(userSites)
    delete user.password
    user._id = user._id.toString()
    return user
}

async function signup({ username, password, fullname, imgUrl }) {
    const saltRounds = 10

    logger.debug(`auth.service - signup with username: ${username}, fullname: ${fullname}`)
    if (!username || !password || !fullname) return Promise.reject('Missing required signup information')

    const userExist = await userService.getByUsername(username)
    if (userExist) return Promise.reject('Username already taken')

    const hash = await bcrypt.hash(password, saltRounds)
    return userService.add({ username, password: hash, fullname, imgUrl })
}

// async function googleLoginSignup(credentials) {
//     const signedupUser = await userService.getByUsername(credentials.username)
//     if (signedupUser) return true

//     if (!signedupUser) {
//         const account = await signup(user)
//         delete account.password
//         account._id = account._id.toString()
//         return account
//     }
//     return login(credentials.username, credentials.password)
//     // Should check this after connecting frontend
//     const match = await bcrypt.compare(signedupUser.password, user.password)
//     if (!match) return Promise.reject('Invalid username or password')
//     delete user.password
//     user._id = user._id.toString()
//     return user
// }

function getLoginToken(user) {
    const userInfo = { _id: user._id, fullname: user.fullname }
    return cryptr.encrypt(JSON.stringify(userInfo))
}

function validateToken(loginToken) {
    try {
        const json = cryptr.decrypt(loginToken)
        const loggedinUser = JSON.parse(json)
        return loggedinUser
    } catch (err) {
        console.log('Invalid login token')
    }
    return null
}

// ;(async ()=>{
//     await signup('bubu', '123', 'Bubu Bi')
//     await signup('mumu', '123', 'Mumu Maha')
// })()
