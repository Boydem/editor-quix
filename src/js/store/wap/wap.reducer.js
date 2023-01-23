// WAP
export const SET_CLICKED_CMP = 'SET_CLICKED_CMP'
// EDITOR
export const SET_SIDEBAR_CONTEXT = 'SET_SIDEBAR_CONTEXT'
export const SET_EL_CLICKED_NODE = 'SET_EL_CLICKED_NODE'
export const SET_IS_EDITING = 'SET_IS_EDITING'
export const SET_WAP = 'SET_WAP'
export const ADD_WAP_UNDO = 'ADD_WAP_UNDO'
export const POP_WAP_UNDO = 'POP_WAP_UNDO'

const initialState = {
    wap: {},
    wapUndos: [],
    isEditing: false,
    clickedCmp: null,
    elClickedNode: null,
}

export function wapReducer(state = initialState, action = {}) {
    let wapUndos = []
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
            console.log('ADDING')
            wapUndos = state.wapUndos
            wapUndos.push(action.newUndoParentCmp)
            console.log('wapUndos:', wapUndos)
            return { ...state, wapUndos }
        case 'POP_WAP_UNDO':
            console.log('POPPING')
            wapUndos = state.wapUndos
            wapUndos.pop()
            console.log('wapUndos:', wapUndos)
            return { ...state, wapUndos }

        default:
            return { ...state }
    }
}
