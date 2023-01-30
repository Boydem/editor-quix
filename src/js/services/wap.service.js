import { getDemoCmps1 } from '../wap-templates/wap-1/wap-1'
import { getDemoCmps2 } from '../wap-templates/wap-2/wap-2'
import { getDemoCmps3 } from '../wap-templates/wap-3/wap-3'
import { getDemoCmps4 } from '../wap-templates/wap-4/wap-4'
import { getDemoCmps5 } from '../wap-templates/wap-5/wap-5'
import { getDemoCmps6 } from '../wap-templates/wap-6/wap-6'
import { getDemoCmps7 } from '../wap-templates/wap-7/wap-7'
import { getDemoGeneralCmps } from '../wap-templates/general-cmps/general-cmps'
import { httpService } from './http.service'

import { makeId, utilService } from './util.service'
import { socketService } from './socket.service'

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
    getWapToEdit,
    getWapCopy,
}

let gCmpsMap
const EDITED_WAP_STORAGE_KEY = 'editedWap'

// _createWaps()
_createMap()
function getCmpById(activeModule, cmpId) {
    return gCmpsMap[activeModule].find(cmp => cmp.id === cmpId)
}
async function getWapByUrl(wapUrl) {
    return httpService.get(`wap/url/${wapUrl}`)
}
async function isWapUrlFree(wapUrl) {
    const waps = await query()
    const isFoundIndex = waps.findIndex(wap => wap.url === wapUrl)

    return isFoundIndex === -1
}

function _createMap() {
    const allFractions = [
        ...getDemoCmps1(),
        ...getDemoCmps2(),
        ...getDemoCmps3(),
        ...getDemoCmps4(),
        ...getDemoCmps5(),
        ...getDemoCmps6(),
        ...getDemoCmps7(),
        ...getDemoGeneralCmps(),
    ]
    gCmpsMap = allFractions.reduce((acc, fraction) => {
        if (acc[fraction.category]) {
            acc[fraction.category].push(structuredClone(fraction))
        } else {
            acc[fraction.category] = [structuredClone(fraction)]
        }
        return acc
    }, {})
}

function getCmpsByCategory(category) {
    return gCmpsMap[category]
}

async function query(filterBy = { owner: '' }) {
    return httpService.get(`wap`, filterBy)
}

async function getWapToEdit(wapId) {
    return httpService.get(`wap/edit/${wapId}`)
}

async function getWapCopy(wapId) {
    return httpService.get(`wap/copy/${wapId}`)
}

async function get(wapId) {
    return httpService.get(`wap/${wapId}`)
}
function remove(wapId) {
    return httpService.remove(`wap/${wapId}`)
}

async function save(wap) {
    socketService.emit('update-wap', wap)
    let savedWap
    if (wap._id) {
        savedWap = httpService.put(`wap/${wap._id}`, wap)
    } else {
        savedWap = httpService.post('wap', wap)
    }
    return savedWap
}

function getEditedWap() {
    return utilService.loadFromStorage(EDITED_WAP_STORAGE_KEY)
}

function getBlankWap() {
    const wap = {
        owner: 'guest',
        title: 'blank-template',
        cmps: [],
        msgs: [],
        leads: [],
        subscribers: [],
        palette: ['#fefefe', '#fefefe', '#fefefe', '#fefefe'],
        schedule: {
            eventDuration: 30,
            daysForward: 6,
            data: [],
            days: ['sunday', 'monday', 'tuesday', 'wednesday'],
            startHour: 8,
            endHour: 17,
        },
        breakpoints: { mobileLayout: 800, tabletLayout: 1050 },
    }
    return save(wap)
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
