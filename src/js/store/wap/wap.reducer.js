// WAP
export const SET_CLICKED_ELEM = 'SET_CLICKED_ELEM'
// EDITOR
export const SET_SIDEBAR_CONTEXT = 'SET_SIDEBAR_CONTEXT'

const initialState = {
    clickedElem: null,
    sidebarContext: null,
}

export function wapReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'SET_CLICKED_ELEM':
            return { ...state, clickedElem: action.elem }
        case 'SET_SIDEBAR_CONTEXT':
            return { ...state, sidebarContext: action.context }
        default:
            return { ...state }
    }
}
