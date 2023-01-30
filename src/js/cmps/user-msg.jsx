import { useEffect, useRef, useState } from 'react'
import { eventBusService } from '../services/event-bus.service'

import * as Toast from '@radix-ui/react-toast'

export function UserMsg() {
    const [msg, setMsg] = useState(null)
    const timeoutIdRef = useRef(null)

    useEffect(() => {
        const unsubscribe = eventBusService.on('show-user-msg', msg => {
            setMsg(msg)
            if (timeoutIdRef.current) {
                clearTimeout(timeoutIdRef.current)
                timeoutIdRef.current = null
            }
            timeoutIdRef.current = setTimeout(closeMsg, 3000)
        })
        return unsubscribe
    }, [])

    function closeMsg() {
        setMsg(null)
    }
    if (!msg) return <span></span>
    return (
        <div className='user-msg'>
            <Toast.Provider swipeDirection='right'>
                <Toast.Root className='ToastRoot' onOpenChange={closeMsg}>
                    <Toast.Title className='ToastTitle'>{msg.txt}</Toast.Title>
                    <Toast.Description asChild>This is a message for users</Toast.Description>
                    <Toast.Action className='ToastAction' asChild altText='Goto schedule to undo'>
                        <button onClick={closeMsg} className={`Button small ${msg.type}`}>
                            Close
                        </button>
                    </Toast.Action>
                </Toast.Root>
                <Toast.Viewport className='ToastViewport' />
            </Toast.Provider>
        </div>
    )
}
