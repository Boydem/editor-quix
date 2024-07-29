import { useState } from 'react'
import { utilService } from '../../../services/util.service'
import { saveWap } from '../../../store/wap/wap.action'
import { AiOutlineSend } from 'react-icons/ai'
import { AiOutlineUser } from 'react-icons/ai'
import { useEffect } from 'react'
import { socketService, SOCKET_EMIT_OWNER_MSG } from '../../../services/socket.service'

export function MessagesDashboard({ user, currSite }) {
    const [msgs, setMsgs] = useState(currSite.msgs)
    const [currContact, setCurrContact] = useState({
        from: Object.keys(currSite.msgs)[0],
        msgs: msgs[Object.keys(currSite.msgs)[0]],
    })
    const [msgTxt, setMsgTxt] = useState('')
    function onContact(keyName) {
        setCurrContact({ from: keyName, msgs: msgs[keyName] })
    }
    useEffect(() => {
        setMsgs(currSite.msgs)
        socketService.off('guest-add-msg')
        socketService.on('guest-add-msg', guestMsg => {
            console.log('ADDED')
            const guest = guestMsg[0]
            if (!currSite.msgs[guest]) {
                currSite.msgs = { [guest]: guestMsg[1], ...currSite.msgs }
                currSite.msgs[guest] = [guestMsg[1]]
            } else {
                currSite.msgs[guest] = [...currSite.msgs[guest], guestMsg[1]]
            }
            console.log('currSite.msgs:', currSite.msgs)
            currContact.msgs = currSite.msgs[guest]
            setCurrContact({ ...currContact })
            setMsgs({ ...currSite.msgs })
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currSite])

    function handleChange(ev) {
        setMsgTxt(ev.target.value)
    }

    function onSend() {
        socketService.emit(SOCKET_EMIT_OWNER_MSG, { ownerMsg: msgTxt, to: currContact.from.slice(5) })
        currContact.msgs.push({ by: 'owner', txt: `${msgTxt}`, date: new Date().getTime() })
        setMsgs(prev => ({ ...prev }))
        saveWap(currSite)
    }
    return (
        <div className='messages-dashboard full'>
            <div className='last-messages info-box info-box-rows chat-contacts'>
                <div className='list-item-preview header'>
                    <h4>Contacts</h4>
                </div>
                {Object.keys(msgs).map((sender, idx) => (
                    <article
                        key={idx}
                        className={`list-item-preview chat-item  ${currContact.from === sender ? 'active' : ''}`}
                    >
                        <div className={`item`} key={sender} onClick={() => onContact(sender)}>
                            <div className='user-avatar'>
                                <AiOutlineUser size={'70%'} />
                            </div>
                            <span className='user-name'>{sender}</span>
                            <div className='message-body'>
                                <p>{msgs[sender]?.at(-1).txt}</p>
                            </div>
                            <div className='time-ago flex'>{utilService.formatTimeAgo(msgs[sender]?.at(-1).date)}</div>
                        </div>
                    </article>
                ))}
            </div>

            <div className='chat'>
                <div className='chat-layout'>
                    <div className='contact bar'>
                        <div className='pic bigger guest'>
                            <AiOutlineUser size={'70%'} fill={'#eee'} />
                        </div>
                        <div className='wrapper'>
                            <div className='name'>{currContact.from}</div>
                            <div className='seen'>
                                {currContact.msgs && utilService.formatTimeAgo(currContact.msgs?.at(-1).date)}
                            </div>
                        </div>
                    </div>
                    <div className='messages' id='chat'>
                        {currContact.msgs && (
                            <div className='time'>{utilService.formatTimeAgo(currContact.msgs?.at(-1).date)}</div>
                        )}
                        {currContact.msgs?.map((msg, idx) => {
                            return (
                                <p className={`${msg.by} message`} key={idx}>
                                    {msg.txt}
                                </p>
                            )
                        })}
                    </div>
                </div>
                <div className='input'>
                    <input placeholder='Type your message here!' type='text' onChange={handleChange} value={msgTxt} />
                    <AiOutlineSend fontSize={'2rem'} className='send-btn' onClick={onSend} color='#444444' />
                </div>
            </div>
        </div>
    )
}
