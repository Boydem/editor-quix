import io from 'socket.io-client'
import { userService } from './user.service'

export const SOCKET_EMIT_SET_ROOM = 'set-wap-room'

export const SOCKET_EMIT_OWNER_MSG = 'owner-msg'
export const SOCKET_EVENT_OWNER_ADD_MSG = 'owner-add-msg'
export const SOCKET_EMIT_GUEST_MSG = 'guest-msg'
export const SOCKET_EVENT_GUEST_ADD_MSG = 'guest-add-msg'

export const SOCKET_EMIT_USER_WATCH = 'user-watch'

export const SOCKET_EMIT_SEND_LEAD = 'send-lead'
export const SOCKET_EVENT_ADD_LEAD = 'add-lead'

export const SOCKET_EMIT_SEND_SUBSCRIBE = 'send-subscription'
export const SOCKET_EVENT_ADD_SUBSCRIBE = 'add-subscription'

export const SOCKET_EMIT_SEND_SCHEDULE = 'send-schedule'
export const SOCKET_EVENT_ADD_SCHEDULE = 'add-schedule'

export const SOCKET_EMIT_SET_USER_EDITOR = 'user-at-editor'
export const SOCKET_EMIT_GET_WAP_UPDATE = 'updated-wap'
export const SOCKET_EVENT_UPDATE_WAP = 'update-wap'

export const SOCKET_EMIT_SET_MOUSE = 'mouse-move'
export const SOCKET_EVENT_MOUSE_MOVE = 'user-mouse-move'

const SOCKET_EMIT_LOGIN = 'set-user-socket'
const SOCKET_EMIT_LOGOUT = 'unset-user-socket'

const baseUrl = process.env.NODE_ENV === 'production' ? '' : '//localhost:3030'
export const socketService = createSocketService()

// for debugging from console
window.socketService = socketService

socketService.setup()

function createSocketService() {
    var socket = null
    const socketService = {
        setup() {
            socket = io(baseUrl)
            setTimeout(() => {
                const user = userService.getLoggedinUser()
                if (user) this.login(user._id)
            }, 500)
        },
        on(eventName, cb) {
            socket.on(eventName, cb)
        },
        off(eventName, cb = null) {
            if (!socket) return
            if (!cb) socket.removeAllListeners(eventName)
            else socket.off(eventName, cb)
        },
        emit(eventName, data) {
            socket.emit(eventName, data)
        },
        login(userId) {
            socket.emit(SOCKET_EMIT_LOGIN, userId)
            // socket.id = userId
        },
        logout() {
            socket.emit(SOCKET_EMIT_LOGOUT)
        },
        getSocketId() {
            return socket.id
        },
        terminate() {
            socket = null
        },
    }
    return socketService
}

// Basic Tests
// function cb(x) {console.log('Socket Test - Expected Puk, Actual:', x)}
// socketService.on('baba', cb)
// socketService.on('baba', cb)
// socketService.on('baba', cb)
// socketService.on('mama', cb)
// socketService.emit('baba', 'Puk')
// socketService.off('baba', cb)
