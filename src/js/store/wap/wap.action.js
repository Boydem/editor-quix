import { wapService } from '../../services/wap.service'
import { store } from '../store'
import {
    SET_CLICKED_CMP,
    SET_EL_CLICKED_NODE,
    SET_IS_EDITING,
    SET_WAP,
    ADD_WAP_UNDO,
    POP_WAP_UNDO,
    ADD_WAP_REDO,
    POP_WAP_REDO,
    CLEAN_WAP_REDO,
    SET_IS_SAVING,
} from './wap.reducer'

let timeoutRef

export async function setClickedCmp(cmp) {
    store.dispatch({ type: SET_CLICKED_CMP, cmp })
}
export async function setElClickedNode(elNode) {
    store.dispatch({ type: SET_EL_CLICKED_NODE, elNode })
}
export async function saveWap(wap) {
    try {
        store.dispatch({ type: SET_IS_SAVING, isSaving: true })
        await wapService.save(wap)
        store.dispatch({ type: SET_WAP, wap })
    } catch (err) {
        console.log('Cannot save wap in wap.action', err)
        throw err
    } finally {
        clearTimeout(timeoutRef)
        timeoutRef = setTimeout(() => {
            store.dispatch({ type: SET_IS_SAVING, isSaving: false })
        }, 2000)
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
export async function setWap(wap) {
    try {
        store.dispatch({ type: SET_WAP, wap })
    } catch (err) {
        console.log('Cannot save wap in wap.action', err)
        throw err
    }
}

export async function saveCmp(newCmp) {
    // wapService.saveCmp
    try {
        store.dispatch({ type: SET_IS_SAVING, isSaving: true })
        let newUndoParentCmp
        const wap = store.getState().wapModule.wap
        await wapService.findParentCmp(newCmp, wap, (cmp, index, parentCmp) => {
            newUndoParentCmp = structuredClone(parentCmp)
            wapService.saveCmp(cmp, index, parentCmp)
        })
        await wapService.save(wap)
        store.dispatch({ type: SET_WAP, wap })
        store.dispatch({ type: ADD_WAP_UNDO, newUndoParentCmp })
        store.dispatch({ type: CLEAN_WAP_REDO })
    } catch (err) {
        console.log('Cannot save cmp in wap.action', err)
        throw err
    } finally {
        clearTimeout(timeoutRef)
        timeoutRef = setTimeout(() => {
            store.dispatch({ type: SET_IS_SAVING, isSaving: false })
        }, 2000)
    }
}
export async function undoChange() {
    try {
        store.dispatch({ type: SET_IS_SAVING, isSaving: true })

        const wapUndos = store.getState().wapModule.wapUndos
        if (!wapUndos || !wapUndos.length) return

        let wap = store.getState().wapModule.wap
        const oldUndoParentCmp = wapUndos.at(-1)
        let redoCmp
        if (oldUndoParentCmp.owner) {
            redoCmp = structuredClone(wap)
            wap = structuredClone(oldUndoParentCmp)
        } else {
            await wapService.findParentCmp(oldUndoParentCmp, wap, (_, index, parentOfParentCmp) => {
                redoCmp = structuredClone(parentOfParentCmp.cmps[index])
                console.log('parentOfParentCmp:', parentOfParentCmp)
                wapService.saveCmp(oldUndoParentCmp, index, parentOfParentCmp)
            })
        }
        await wapService.save(wap)
        store.dispatch({ type: SET_WAP, wap })
        store.dispatch({ type: POP_WAP_UNDO })
        store.dispatch({ type: ADD_WAP_REDO, redoCmp })
    } catch (err) {
        console.log('Cannot save cmp in wap.action', err)
        throw err
    } finally {
        clearTimeout(timeoutRef)
        timeoutRef = setTimeout(() => {
            store.dispatch({ type: SET_IS_SAVING, isSaving: false })
        }, 2000)
    }
}

export async function redoChange() {
    try {
        store.dispatch({ type: SET_IS_SAVING, isSaving: true })
        const wapRedos = store.getState().wapModule.wapRedos
        if (!wapRedos || !wapRedos.length) return

        let wap = store.getState().wapModule.wap
        let redoCmp = wapRedos.at(-1)
        let undoCmp
        if (redoCmp.owner) {
            undoCmp = structuredClone(wap)
            wap = structuredClone(redoCmp)
        } else {
            await wapService.findParentCmp(redoCmp, wap, (_, index, parentOfParentCmp) => {
                undoCmp = structuredClone(parentOfParentCmp.cmps[index])
                wapService.saveCmp(redoCmp, index, parentOfParentCmp)
            })
        }
        await wapService.save(wap)
        store.dispatch({ type: SET_WAP, wap })
        store.dispatch({ type: ADD_WAP_UNDO, newUndoParentCmp: undoCmp })
        store.dispatch({ type: POP_WAP_REDO })
    } catch (err) {
        console.log('Cannot save cmp in wap.action', err)
        throw err
    } finally {
        clearTimeout(timeoutRef)
        timeoutRef = setTimeout(() => {
            store.dispatch({ type: SET_IS_SAVING, isSaving: false })
        }, 2000)
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
        store.dispatch({ type: SET_IS_SAVING, isSaving: true })
        await wapService.save(wap)
        store.dispatch({ type: SET_WAP, wap })
        store.dispatch({ type: ADD_WAP_UNDO, newUndoParentCmp })
        store.dispatch({ type: SET_CLICKED_CMP, cmp: null })
        store.dispatch({ type: SET_EL_CLICKED_NODE, elNode: null })
    } catch (err) {
        console.log('Cannot remove cmp in wap.action', err)
        throw err
    } finally {
        clearTimeout(timeoutRef)
        timeoutRef = setTimeout(() => {
            store.dispatch({ type: SET_IS_SAVING, isSaving: false })
        }, 2000)
    }
}

export async function setIsEditing(mode) {
    store.dispatch({ type: SET_IS_EDITING, mode })
}

export async function updateCurrSite(currSite) {
    try {
        let wap = await wapService.get(currSite._id)
        wap = { ...wap, ...currSite }
        await wapService.save(wap)
    } catch (err) {
        console.error(err)
        throw err
    }
}
