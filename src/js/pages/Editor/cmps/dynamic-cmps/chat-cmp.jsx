import { useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import DynamicCmp from '../dynamic-cmp'
import DynamicElement from './dynamic-element'
import { BsChatFill } from 'react-icons/bs'
import { AiOutlineSend } from 'react-icons/ai'
import { makeId, utilService } from '../../../../services/util.service'
import { saveCmp, saveWap } from '../../../../store/wap/wap.action'
import { socketService, SOCKET_EMIT_GUEST_MSG, SOCKET_EVENT_OWNER_ADD_MSG } from '../../../../services/socket.service'

export function ChatCmp({ cmp, onSelectCmp, onHoverCmp }) {
    const wap = useSelector(storeState => storeState.wapModule.wap)
    const isEditing = useSelector(storeState => storeState.wapModule.isEditing)
    let [msgs, setMsgs] = useState(null)
    const chatRef = useRef()
    const guestId = useRef()

    // Here we listen to .on(owner-send-msg) - adding msg to guest chat
    useEffect(() => {
        socketService.on(SOCKET_EVENT_OWNER_ADD_MSG, ownerMsg => {
            setMsgs(prevMsgs => [...prevMsgs, ownerMsg])
        })
        guestId.current = socketService.getSocketId()
    }, [])

    // useEffect(() => {
    //     if (!isEditing) {
    //         const elChat = document.querySelector('.chat-1').classList.add('preview-chat')
    //         console.log(elChat)
    //     }
    // }, [])

    const [msg, setMsg] = useState('')

    function onSubmit(ev) {
        ev.preventDefault()
    }

    function handleChange(ev) {
        const value = ev.target.value
        setMsg(value)
    }

    function onOpenChat() {
        chatRef.current.classList.toggle('hidden')
    }

    function onSend() {
        socketService.emit(SOCKET_EMIT_GUEST_MSG, {
            guestMsg: [`guest${socketService.getSocketId()}`, msg],
            to: wap.owner,
        })
        let currGuest
        if (!msgs) {
            currGuest = `guest${socketService.getSocketId()}`
            wap.msgs = { [currGuest]: [], ...wap.msgs }
            msgs = wap.msgs[currGuest]
        }
        // Here emit to guest-send-msg sending {guestId, content, time}
        msgs.push({ by: 'customer', txt: `${msg}`, date: new Date().getTime() })
        setMsg('')
        // saveCmp(cmp)
        saveWap(wap)
        setMsgs(msgs)
        // socketService.emit('private message', {
        //     content,
        //     to: this.selectedUser.userID,
        // })
    }
    // const msgs = wap.msgs.guest1
    const chatInputCmp = cmp?.cmps[1]?.cmps.at(-1)

    return (
        <div
            className={cmp.name}
            style={cmp.style}
            onClick={e => onSelectCmp(e, cmp)}
            onMouseOver={onHoverCmp}
            onMouseOut={ev => ev.currentTarget.classList.remove('hover')}
            onSubmit={onSubmit}
        >
            <button
                className={cmp.cmps[0].name}
                style={cmp.style}
                // onClick={e => onSelectCmp(e, cmp)}
                onClick={onOpenChat}
                onMouseOver={onHoverCmp}
                onMouseOut={ev => ev.currentTarget.classList.remove('hover')}
                spellCheck='false'
            >
                <BsChatFill size={'1.3rem'} />
            </button>
            <div
                className={cmp.cmps[1].name}
                style={cmp.style}
                onClick={e => onSelectCmp(e, cmp)}
                onMouseOver={onHoverCmp}
                onMouseOut={ev => ev.currentTarget.classList.remove('hover')}
                ref={chatRef}
            >
                {cmp.cmps[1].cmps?.map(c => {
                    return <DynamicCmp cmp={c} key={c.id} />
                })}
                <div className='messages flex-end'>
                    <p className={`owner message`}>{wap.chatStartingMsg}</p>
                    {msgs?.map((msg, idx) => {
                        return (
                            <p className={`${msg.by} message`} key={idx}>
                                {msg.txt}
                            </p>
                        )
                    })}
                </div>
                <div className='input'>
                    <input
                        className={chatInputCmp.name}
                        key={chatInputCmp.id}
                        style={cmp.style}
                        name={chatInputCmp.inputName}
                        onClick={e => onSelectCmp(e, cmp)}
                        placeholder={cmp.content?.placeholder}
                        onMouseOver={onHoverCmp}
                        onMouseOut={ev => ev.currentTarget.classList.remove('hover')}
                        onChange={handleChange}
                        value={msg}
                    ></input>
                    <button>
                        <AiOutlineSend size={'2rem'} onClick={onSend} />
                    </button>
                </div>
            </div>
        </div>
    )
}
