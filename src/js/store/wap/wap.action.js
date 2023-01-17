import { store } from '../store'

export async function setClickedElem(elem) {
    store.dispatch({ type: 'SET_CLICKED_ELEM', elem })
}
// export async function removeUser(userId) {
//     try {
//         await userService.remove(userId)
//         store.dispatch({ type: 'REMOVE_USER', userId })
//     } catch (err) {
//         console.log('UserActions: err in removeUser', err)
//     }
// }
