// WAP
export const SET_CLICKED_CMP = 'SET_CLICKED_CMP'
// EDITOR
export const SET_SIDEBAR_CONTEXT = 'SET_SIDEBAR_CONTEXT'
export const SET_EL_CLICKED_NODE = 'SET_EL_CLICKED_NODE'
export const SET_IS_EDITING = 'SET_IS_EDITING'
export const SET_WAP = 'SET_WAP'
export const ADD_WAP_UNDO = 'ADD_WAP_UNDO'
export const POP_WAP_UNDO = 'POP_WAP_UNDO'
export const ADD_WAP_REDO = 'ADD_WAP_REDO'
export const POP_WAP_REDO = 'POP_WAP_REDO'
export const CLEAN_WAP_REDO = 'CLEAN_WAP_REDO'
export const SET_IS_SAVING = 'SET_IS_SAVING'

const initialState = {
    wap: {},
    wapUndos: [],
    wapRedos: [],
    isEditing: false,
    clickedCmp: null,
    elClickedNode: null,
    isSaving: false,
}

export function wapReducer(state = initialState, action = {}) {
    let wapUndos = []
    let wapRedos = []
    switch (action.type) {
        case 'SET_WAP':
            return { ...state, wap: { ...action.wap } }
        case 'SET_CLICKED_CMP':
            return { ...state, clickedCmp: action.cmp }
        case 'SET_EL_CLICKED_NODE':
            return { ...state, elClickedNode: action.elNode }
        case 'SET_IS_EDITING':
            return { ...state, isEditing: action.mode }
        case 'ADD_WAP_UNDO':
            wapUndos = state.wapUndos
            wapUndos.push(action.newUndoParentCmp)
            return { ...state, wapUndos }
        case 'POP_WAP_UNDO':
            wapUndos = state.wapUndos
            wapUndos.pop()
            return { ...state, wapUndos }
        case 'ADD_WAP_REDO':
            wapRedos = state.wapRedos
            wapRedos.push(action.redoCmp)
            return { ...state, wapRedos }
        case 'POP_WAP_REDO':
            wapRedos = state.wapRedos
            wapRedos.pop()
            return { ...state, wapRedos }
        case 'CLEAN_WAP_REDO':
            return { ...state, wapRedos: [] }

        case SET_IS_SAVING:
            return { ...state, isSaving: action.isSaving }

        default:
            return { ...state }
    }
}
