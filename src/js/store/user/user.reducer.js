import { userService } from '../../services/user.service.js'

export const SET_USER = 'SET_USER'
export const SET_CURR_SITE = 'SET_CURR_SITE'

const initialState = {
    user: userService.getLoggedinUser(),
    currSite: null,
    users: [],
}
export function userReducer(state = initialState, action) {
    console.log('state.user:', state.user)
    var newState = state
    switch (action.type) {
        case 'SET_USER':
            newState = { ...state, user: action.user }
            break
        case 'REMOVE_USER':
            newState = {
                ...state,
                users: state.users.filter(user => user._id !== action.userId),
            }
            break
        case 'SET_USERS':
            newState = { ...state, users: action.users }
            break
        case 'SET_CURR_SITE':
            console.log('action.currSite', action.currSite)
            newState = { ...state, currSite: action.currSite }
            break
        default:
    }
    // For debug:
    // window.userState = newState
    // console.log('State:', newState)
    return { ...newState }
}
