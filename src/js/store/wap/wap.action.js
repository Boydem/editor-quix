import { store } from '../store'
import { SET_CLICKED_ELEM, SET_SIDEBAR_CONTEXT } from './wap.reducer'

export async function setClickedElem(elem) {
    store.dispatch({ type: SET_CLICKED_ELEM, elem })
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
