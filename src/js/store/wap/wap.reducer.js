// WAP
export const SET_CLICKED_ELEM = 'SET_CLICKED_ELEM'
// EDITOR
export const SET_SIDEBAR_CONTEXT = 'SET_SIDEBAR_CONTEXT'
export const SET_CLICKED_ELEM_NODE = 'SET_CLICKED_ELEM_NODE'
export const SET_WAP = 'SET_WAP'

const initialState = {
    wap: {},
    clickedElem: null,
    clickedElemNode: null,
    sidebarContext: null,
}

export function wapReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'SET_WAP':
            // console.log('action.wap:', action.wap)
            return { ...state, wap: { ...action.wap } }
        case 'SET_CLICKED_ELEM':
            return { ...state, clickedElem: action.elem }
        case 'SET_CLICKED_ELEM_NODE':
            console.log(action.elemNode)
            return { ...state, clickedElemNode: action.elemNode }
        case 'SET_SIDEBAR_CONTEXT':
            return { ...state, sidebarContext: action.context }
        default:
            return { ...state }
    }
}
