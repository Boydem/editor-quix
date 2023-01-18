// WAP
export const SET_CLICKED_CMP = 'SET_CLICKED_CMP'
// EDITOR
export const SET_SIDEBAR_CONTEXT = 'SET_SIDEBAR_CONTEXT'
export const SET_CLICKED_ELEM_NODE = 'SET_CLICKED_ELEM_NODE'
export const SET_IS_EDITING = 'SET_IS_EDITING'
export const SET_WAP = 'SET_WAP'

const initialState = {
    wap: {},
    isEditing: false,
    clickedCmp: null,
    clickedElemNode: null,
    sidebarContext: null,
}

export function wapReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'SET_WAP':
            return { ...state, wap: { ...action.wap } }
        case 'SET_CLICKED_CMP':
            return { ...state, clickedCmp: action.elem }
        case 'SET_CLICKED_ELEM_NODE':
            console.log(action.elemNode)
            return { ...state, clickedElemNode: action.elemNode }
        case 'SET_SIDEBAR_CONTEXT':
            return { ...state, sidebarContext: action.context }
        case 'SET_IS_EDITING':
            return { ...state, isEditing: action.mode }
        default:
            return { ...state }
    }
}
