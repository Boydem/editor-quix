// import { getWap1Template } from '../wap-templates/wap-template-1/wap-1-template'
import { getDemoCmps1 } from '../wap-templates/wap-1/wap-1'
// import { getWap2Template } from '../wap-templates/wap-template-2/wap-2-template'
import { getDemoCmps2 } from '../wap-templates/wap-2/wap-2'
// import { getWap3Template } from '../wap-templates/wap-template-3/wap-template-3'
import { getDemoCmps3 } from '../wap-templates/wap-3/wap-3'
import { getDemoGeneralCmps } from '../wap-templates/general-cmps/general-cmps'
import { getDemoCmps4 } from '../wap-templates/wap-4/wap-4'
import { getDemoCmps5 } from '../wap-templates/wap-5/wap-5-template'
import { getDemoCmps7 } from '../wap-templates/wap-7/wap-7'

import { storageService } from './async-storage.service'
import { makeId, utilService } from './util.service'

export const wapService = {
    getCmpById,
    query,
    get,
    remove,
    save,
    getEditedWap,
    getCmpsByCategory,
    findParentCmp,
    getWapByUrl,
    removeCmp,
    saveCmp,
    getBlankWap,
}

let gCmpsMap
const STORAGE_KEY = 'wapDB'
const EDITED_WAP_STORAGE_KEY = 'editedWap'

_createWaps()
function getCmpById(activeModule, cmpId) {
    return gCmpsMap[activeModule].find(cmp => cmp.id === cmpId)
}
async function getWapByUrl(wapUrl) {
    try {
        let wap = await query({ url: wapUrl })
        if (!wap[0]) Promise.reject('NOT FOUND')

        return wap[0]
    } catch (err) {
        throw err
    }
    // return gCmpsMap[activeModule].find(cmp => cmp.url === cmpUrl)
}

function _createMap() {
    const allFractions = [...getDemoCmps1(), ...getDemoCmps2(), ...getDemoCmps3(), ...getDemoGeneralCmps()]
    gCmpsMap = allFractions.reduce((acc, fraction) => {
        if (acc[fraction.category]) {
            acc[fraction.category].push(fraction)
        } else {
            acc[fraction.category] = [fraction]
        }
        return acc
    }, {})
}

// function updateCmp(cmp, parentCmp) {
//     let foundCmp = parentCmp?.cmps?.find(c => c.id === cmp.id)
//     if (foundCmp) {
//         foundCmp = cmp
//     } else {
//         return parentCmp?.cmps?.forEach(c => updateCmp(cmp, c))
//     }
// }

function getCmpsByCategory(category) {
    return gCmpsMap[category]
}

async function query(filterBy = { url: '' }) {
    try {
        const waps = await storageService.query(STORAGE_KEY)

        let filteredWaps = waps
        if (filterBy.url) {
            filteredWaps = waps.filter(wap => wap.url === filterBy.url)
        }
        return filteredWaps
    } catch (err) {
        throw err
    }
}

_createMap()
async function get(wapId) {
    return await storageService.get(STORAGE_KEY, wapId)
}
function remove(wapId) {
    return storageService.remove(STORAGE_KEY, wapId)
}

async function save(wap) {
    let savedWap
    if (wap._id) {
        savedWap = await storageService.put(STORAGE_KEY, wap)
        // savedCar = await httpService.put(`car/${car._id}`, car)
    } else {
        // Later, owner is set by the backend
        // car.owner = userService.getLoggedinUser()
        savedWap = await storageService.post(STORAGE_KEY, wap)
        // savedCar = await httpService.post('car', car)
    }
    return savedWap
}

function getEditedWap() {
    return utilService.loadFromStorage(EDITED_WAP_STORAGE_KEY)
}

function getBlankWap() {
    return {
        _id: makeId(),
        owner: 'guest',
        title: 'blank-template',
        cmps: [],
        msgs: [],
        breakpoints: { mobileLayout: 800, tabletLayout: 1050 },
    }
}

function _createWaps() {
    let waps = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (!waps || !waps.length) {
        waps = [
            {
                _id: utilService.makeId(),
                name: 'wap-1',
                owner: 'admin',
                cmps: getDemoCmps1(),
                pallete: ['#ffbf23', '#ffd7ef', '#ffffff', '#101010'],
                themeClass: 'wap1-primary',
                breakpoints: { mobileLayout: 800, tabletLayout: 1350 },
                msgs: [
                    { by: 'customer', txt: "Hey, man! What's up, Mr Stark?" },
                    { by: 'owner', txt: "Kid, where'd you come from?" },
                    { by: 'customer', txt: 'Field trip!' },
                    { by: 'owner', txt: "Uh, what is this guy's problem, Mr. Stark?" },
                    {
                        by: 'customer',
                        txt: "Uh, he's from space, he came here to steal a necklace from a wizard.",
                    },
                ],
                thumbnail:
                    'https://res.cloudinary.com/dotasvsuv/image/upload/v1674060298/wap-1-index-thumbnail_ygzwg7.jpg',
                title: 'WeDu',
            },
            {
                _id: utilService.makeId(),
                name: 'wap-2',
                owner: 'admin',
                cmps: getDemoCmps2(),
                pallete: ['#a3eee9', '#0b1321', '#8b95a6', '#eef'],
                themeClass: 'wap2-primary',
                breakpoints: {
                    tabletLayout: 1000,
                },
                msgs: [
                    { by: 'customer', txt: "Hey, man! What's up, Mr Stark?" },
                    { by: 'owner', txt: "Kid, where'd you come from?" },
                    { by: 'customer', txt: 'Field trip!' },
                    { by: 'owner', txt: "Uh, what is this guy's problem, Mr. Stark?" },
                    {
                        by: 'customer',
                        txt: "Uh, he's from space, he came here to steal a necklace from a wizard.",
                    },
                ],

                thumbnail:
                    'https://res.cloudinary.com/dotasvsuv/image/upload/v1674060311/wap-2-index-thumbnail_ausxyt.jpg',
                title: 'Gigaplay',
            },
            {
                _id: utilService.makeId(),
                name: 'wap-3',
                owner: 'admin',
                cmps: getDemoCmps3(),
                pallete: ['#dcdcdc', '#303030', '#5783de'],
                themeClass: 'wap3-primary',
                breakpoints: {
                    mobileLayout: 700,
                    tabletLayout: 1050,
                },
                msgs: [
                    { by: 'customer', txt: "Hey, man! What's up, Mr Stark?" },
                    { by: 'owner', txt: "Kid, where'd you come from?" },
                    { by: 'customer', txt: 'Field trip!' },
                    { by: 'owner', txt: "Uh, what is this guy's problem, Mr. Stark?" },
                    {
                        by: 'customer',
                        txt: "Uh, he's from space, he came here to steal a necklace from a wizard.",
                    },
                ],

                thumbnail:
                    'https://res.cloudinary.com/dotasvsuv/image/upload/v1674060492/wap-3-index-thumbnail_dheye8.jpg',
                title: 'Finclvr',
            },
            {
                _id: utilService.makeId(),
                name: 'wap-4',
                owner: 'admin',
                cmps: getDemoCmps4(),
                themeClass: 'wap4-primary',
                breakpoints: {
                    mobileLayout: 750,
                    tabletLayout: 1400,
                },
                msgs: [
                    { by: 'customer', txt: "Hey, man! What's up, Mr Stark?" },
                    { by: 'owner', txt: "Kid, where'd you come from?" },
                    { by: 'customer', txt: 'Field trip!' },
                    { by: 'owner', txt: "Uh, what is this guy's problem, Mr. Stark?" },
                    {
                        by: 'customer',
                        txt: "Uh, he's from space, he came here to steal a necklace from a wizard.",
                    },
                ],

                thumbnail: 'https://res.cloudinary.com/dotasvsuv/image/upload/v1674259751/wap4-thumbnail_lj6j7a.jpg',
                title: 'ONMYSCREEN',
            },
            {
                _id: utilService.makeId(),
                name: 'wap-5',
                owner: 'admin',
                cmps: getDemoCmps5(),
                themeClass: 'wap5-primary',
                breakpoints: {
                    mobileLayout: 550,
                    tabletLayout: 1130,
                    desktopLayout: 1500,
                },
                msgs: [
                    { by: 'customer', txt: "Hey, man! What's up, Mr Stark?" },
                    { by: 'owner', txt: "Kid, where'd you come from?" },
                    { by: 'customer', txt: 'Field trip!' },
                    { by: 'owner', txt: "Uh, what is this guy's problem, Mr. Stark?" },
                    {
                        by: 'customer',
                        txt: "Uh, he's from space, he came here to steal a necklace from a wizard.",
                    },
                ],

                thumbnail: 'https://res.cloudinary.com/dotasvsuv/image/upload/v1674308505/wap5-thumbnail_ockqmi.jpg',
                title: 'Restaurante X',
            },
            {
                _id: utilService.makeId(),
                name: 'wap-7',
                owner: 'admin',
                cmps: getDemoCmps7(),
                themeClass: 'wap7-primary',
                breakpoints: {
                    mobileLayout: 680,
                    tabletLayout: 880,
                    desktopLayout: 1300,
                },
                msgs: [
                    { by: 'customer', txt: "Hey, man! What's up, Mr Stark?" },
                    { by: 'owner', txt: "Kid, where'd you come from?" },
                    { by: 'customer', txt: 'Field trip!' },
                    { by: 'owner', txt: "Uh, what is this guy's problem, Mr. Stark?" },
                    {
                        by: 'customer',
                        txt: "Uh, he's from space, he came here to steal a necklace from a wizard.",
                    },
                ],

                thumbnail: 'https://res.cloudinary.com/dotasvsuv/image/upload/v1674479603/wap-7-thumbnail_f7fyrx.jpg',
                title: 'Music Podcast',
            },
        ]

        localStorage.setItem(STORAGE_KEY, JSON.stringify(waps))
    }
}

function saveCmp(cmp, index, parentCmp) {
    parentCmp.cmps.splice(index, 1, cmp)
}

function findParentCmp(cmp, parentCmp, cb) {
    const isFoundCmpIndex = parentCmp?.cmps?.findIndex(c => c.id === cmp.id)
    if (isFoundCmpIndex > -1) {
        cb(cmp, isFoundCmpIndex, parentCmp)
    } else {
        return parentCmp?.cmps?.forEach(c => findParentCmp(cmp, c, cb))
    }
}

function removeCmp(cmp, index, parentCmp) {
    parentCmp.cmps.splice(index, 1)
}
