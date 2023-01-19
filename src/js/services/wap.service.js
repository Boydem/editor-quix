// import { getWap1Template } from '../wap-templates/wap-template-1/wap-1-template'
import { getDemoCmps1 } from '../wap-templates/wap-1/wap-1'
// import { getWap2Template } from '../wap-templates/wap-template-2/wap-2-template'
import { getDemoCmps2 } from '../wap-templates/wap-2/wap-2'
// import { getWap3Template } from '../wap-templates/wap-template-3/wap-template-3'
import { getDemoCmps3 } from '../wap-templates/wap-3/wap-3'
import { storageService } from './async-storage.service'
import { utilService } from './util.service'

export const wapService = {
    getCmpById,
    query,
    get,
    remove,
    save,
    getEditedWap,
    getCmpsByCategory,
    updateCmp,
    // saveCmp,
}

let gCmpsMap
const STORAGE_KEY = 'wapDB'
const EDITED_WAP_STORAGE_KEY = 'editedWap'

_createWaps()
function getCmpById(activeModule, cmpId) {
    return gCmpsMap[activeModule].find(cmp => cmp.id === cmpId)
}

function _createMap() {
    const allFractions = [...getDemoCmps1(), ...getDemoCmps2(), ...getDemoCmps3()]
    gCmpsMap = allFractions.reduce((acc, fraction) => {
        if (acc[fraction.category]) {
            acc[fraction.category].push(fraction)
        } else {
            acc[fraction.category] = [fraction]
        }
        return acc
    }, {})
}

function updateCmp(cmp, parentCmp) {
    let foundCmp = parentCmp?.cmps?.find(c => c.id === cmp.id)
    if (foundCmp) {
        foundCmp = cmp
    } else {
        return parentCmp?.cmps?.forEach(c => updateCmp(cmp, c))
    }
}

function getCmpsByCategory(category) {
    return gCmpsMap[category]
}

function query() {
    return storageService.query(STORAGE_KEY)
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

function _createWaps() {
    let waps = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (!waps || !waps.length) {
        waps = [
            {
                _id: utilService.makeId(),
                name: 'wap-1',
                owner: 'admin',
                cmps: getDemoCmps1(),
                thumbnail:
                    'https://res.cloudinary.com/dotasvsuv/image/upload/v1674060298/wap-1-index-thumbnail_ygzwg7.jpg',
                title: 'WeDu',
            },
            {
                _id: utilService.makeId(),
                name: 'wap-2',
                owner: 'admin',
                cmps: getDemoCmps2(),
                thumbnail:
                    'https://res.cloudinary.com/dotasvsuv/image/upload/v1674060311/wap-2-index-thumbnail_ausxyt.jpg',
                title: 'Gigaplay',
            },
            {
                _id: utilService.makeId(),
                name: 'wap-3',
                owner: 'admin',
                cmps: getDemoCmps3(),
                thumbnail:
                    'https://res.cloudinary.com/dotasvsuv/image/upload/v1674060492/wap-3-index-thumbnail_dheye8.jpg',
                title: 'Finclvr',
            },
        ]

        localStorage.setItem(STORAGE_KEY, JSON.stringify(waps))
    }
}

// function saveCmp(cmp, index, parentCmp) {
//     parentCmp[index] = cmp
// }

// function updateCmp(cmp, parentCmp, cb) {
//     const isFoundCmpIndex = parentCmp?.cmps?.findIndex(c => c.id === cmp.id)
//     if (isFoundCmpIndex > -1) {
//         saveCmp(cmp, isFoundCmpIndex, parentCmp)
//     } else {
//         return parentCmp?.cmps?.forEach(c => updateCmp(cmp, c, cb))
//     }
// }
