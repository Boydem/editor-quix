import { wapService } from '../../services/wap.service'
import { store } from '../store'
import {
    SET_CLICKED_CMP,
    SET_EL_CLICKED_NODE,
    SET_IS_EDITING,
    SET_WAP,
    ADD_WAP_UNDO,
    POP_WAP_UNDO,
} from './wap.reducer'

export async function setClickedCmp(cmp) {
    store.dispatch({ type: SET_CLICKED_CMP, cmp })
}
export async function setElClickedNode(elNode) {
    store.dispatch({ type: SET_EL_CLICKED_NODE, elNode })
}
export async function saveWap(wap) {
    try {
        await wapService.save(wap)
        store.dispatch({ type: SET_WAP, wap })
    } catch (err) {
        console.log('Cannot save wap in wap.action', err)
        throw err
    }
}
export async function setWapNull() {
    try {
        store.dispatch({ type: SET_WAP, wap: null })
    } catch (err) {
        console.log('Cannot save wap in wap.action', err)
        throw err
    }
}

export async function saveCmp(newCmp) {
    // wapService.saveCmp
    try {
        let newUndoParentCmp
        const wap = store.getState().wapModule.wap
        await wapService.findParentCmp(newCmp, wap, (cmp, index, parentCmp) => {
            newUndoParentCmp = structuredClone(parentCmp)
            wapService.saveCmp(cmp, index, parentCmp)
        })
        await wapService.save(wap)
        store.dispatch({ type: SET_WAP, wap })
        store.dispatch({ type: ADD_WAP_UNDO, newUndoParentCmp })
    } catch (err) {
        console.log('Cannot save cmp in wap.action', err)
        throw err
    }
}
export async function undoChange() {
    try {
        const wapUndos = store.getState().wapModule.wapUndos
        if (!wapUndos || !wapUndos.length) return

        let wap = store.getState().wapModule.wap
        const oldUndoParentCmp = wapUndos.at(-1)
        if (oldUndoParentCmp.owner) {
            wap = structuredClone(oldUndoParentCmp)
        } else {
            await wapService.findParentCmp(oldUndoParentCmp, wap, (newUndoParentCmp, index, parentOfParentCmp) => {
                wapService.saveCmp(newUndoParentCmp, index, parentOfParentCmp)
            })
        }

        await wapService.save(wap)
        store.dispatch({ type: SET_WAP, wap })
        store.dispatch({ type: POP_WAP_UNDO })
    } catch (err) {
        console.log('Cannot save cmp in wap.action', err)
        throw err
    }
}

export async function removeCmp(newCmp) {
    try {
        let newUndoParentCmp
        const wap = store.getState().wapModule.wap
        await wapService.findParentCmp(newCmp, wap, (cmp, index, parentCmp) => {
            newUndoParentCmp = structuredClone(parentCmp)
            wapService.removeCmp(cmp, index, parentCmp)
        })
        await wapService.save(wap)
        store.dispatch({ type: SET_WAP, wap })
        store.dispatch({ type: ADD_WAP_UNDO, newUndoParentCmp })
        store.dispatch({ type: SET_CLICKED_CMP, cmp: null })
        store.dispatch({ type: SET_EL_CLICKED_NODE, elNode: null })
    } catch (err) {
        console.log('Cannot remove cmp in wap.action', err)
        throw err
    }
}

export async function setIsEditing(mode) {
    store.dispatch({ type: SET_IS_EDITING, mode })
}
