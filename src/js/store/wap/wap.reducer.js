const initialState = {
    clickedElem: null,
}

export function wapReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'SET_CLICKED_ELEM':
            return { ...state, clickedElem: action.elem }
        default:
            return { ...state }
    }
}
