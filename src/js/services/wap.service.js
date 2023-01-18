import { getWap1Template } from '../wap-templates/wap-template-1/wap-1-template'
import { getWap2Template } from '../wap-templates/wap-template-2/wap-2-template'
import { storageService } from './async-storage.service'
import { makeId, utilService } from './util.service'
import { wap1Hero } from '../wap-templates/wap-template-1/wap-1-hero'
import wap2Hero from '../wap-templates/wap-template-2/wap-2-hero.json'

export const wapService = {
    getCmpById,
    query,
    get,
    remove,
    save,
    getEditedWap,
}
let gCmpsMap

// {"headers":["gfdsgfdsgds", "gfdsgfdsgds"],
// "section":["gfdsgfdsgds", "gfdsgfdsgds"],
// "nav":["gfdsgfdsgds", "gfdsgfdsgds"], }

const STORAGE_KEY = 'wapDB'
const EDITED_WAP_STORAGE_KEY = 'editedWap'

const cmpsInList = [wap1Hero, wap2Hero]
function getCmpById(id) {
    return cmpsInList.find(cmp => cmp.id === id)
}
function _createMap() {
    const allFractions = [...getWap1Template(), ...getWap2Template()]
    gCmpsMap = allFractions.reduce((acc, fraction) => {
        if (acc[fraction.category]) {
            acc[fraction.category].push(fraction)
        } else {
            acc[fraction.category] = [fraction]
        }
        return acc
    }, {})
    console.log(gCmpsMap)
}
_createWaps()

function query() {
    return storageService.query(STORAGE_KEY)
}

_createMap()
async function get(wapId) {
    const template = await storageService.get(STORAGE_KEY, wapId)
    return template
}
function remove(wapId) {
    return storageService.remove(STORAGE_KEY, wapId)
}

// async function save(wap) {
//     return utilService.saveToStorage(EDITED_WAP_STORAGE_KEY, wap)
// }
async function save(wap) {
    var savedWap
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
                _id: makeId(),
                name: 'wap-1-template',
                owner: 'admin',
                cmps: getWap1Template(),
            },
            {
                _id: makeId(),
                name: 'wap-2-template',
                owner: 'admin',
                cmps: getWap2Template(),
            },
        ]

        localStorage.setItem(STORAGE_KEY, JSON.stringify(waps))
    }
}
