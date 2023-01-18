import { useSelector } from 'react-redux'
import { wapService } from '../../services/wap.service'
import { store } from '../store'
import { SET_CLICKED_ELEM, SET_SIDEBAR_CONTEXT, SET_WAP } from './wap.reducer'

export async function setClickedElem(elem) {
    store.dispatch({ type: SET_CLICKED_ELEM, elem })
}
export async function saveWap(wap) {
    try {
        console.log(wap)
        wapService.save(wap)
        store.dispatch({ type: SET_WAP, wap })
    } catch (err) {
        throw err
    }
}

export async function saveCmp(newCmp) {
    try {
        const wap = store.getState().wapModule.wap
        wapService.updateCmp(newCmp, wap)
        wapService.save(wap)
        store.dispatch({ type: SET_WAP, wap })
    } catch (err) {
        throw err
    }
}

export async function setSidebarContext(context) {
    store.dispatch({ type: SET_SIDEBAR_CONTEXT, context })
}
// export async function removeUser(userId) {
//     try {
//         await userService.remove(userId)
//         store.dispatch({ type: 'REMOVE_USER', userId })
//     } catch (err) {
//         console.log('UserActions: err in removeUser', err)
//     }
// }
