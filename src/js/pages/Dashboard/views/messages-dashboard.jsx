import { useState } from 'react'
import { utilService } from '../../../services/util.service'
import { saveWap } from '../../../store/wap/wap.action'
import { AiOutlineSend } from 'react-icons/ai'
import { AiOutlineUser } from 'react-icons/ai'
import { useEffect } from 'react'
import {
    socketService,
    SOCKET_EMIT_OWNER_MSG,
    SOCKET_EVENT_GUEST_ADD_MSG,
    SOCKET_EVENT_UPDATE_WAP,
} from '../../../services/socket.service'

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
        socketService.on('guest-add-msg', guestMsg => {
            const guest = guestMsg[0]
            if (!currSite.msgs[guest]) {
                currSite.msgs = { [guest]: guestMsg[1], ...currSite.msgs }
                currSite.msgs[guest] = [guestMsg[1]]
            } else {
                currSite.msgs[guest] = [...currSite.msgs[guest], guestMsg[1]]
            }
            // if (!msgs[guest]) {
            //     msgs[guest] = [guestMsg[1]]
            //     console.log('msgs:', msgs)
            // }
            // } else {
            //     msgs[guestMsg] = [...msgs[guest], guestMsg[1]]
            // }
            setMsgs({ ...currSite.msgs })
        })
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
        // <section className='layout-wrapper'>
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
                            {/* <span className='user-name'>Guest</span> */}
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
                            {/* <div className='name'>Guest</div> */}
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

                    {/* <div className='contact bar'>
                            <div className='pic stark'></div>
                            <div className='name'>Tony Stark</div>
                            <div className='seen'>Today at 12:56</div>
                        </div>
                        <div className='messages' id='chat'>
                            <div className='time'>Today at 11:41</div>
                            <div className='message parker'>Hey, man! What's up, Mr Stark? 👋</div>
                            <div className='message stark'>Kid, where'd you come from?</div>
                            <div className='message parker'>Field trip! 🤣</div>
                            <div className='message parker'>Uh, what is this guy's problem, Mr. Stark? 🤔</div>
                            <div className='message stark'>
                                Uh, he's from space, he came here to steal a necklace from a wizard.
                            </div>
                        </div> */}
                </div>
                <div className='input'>
                    {/* <i className='fas fa-camera'></i>
                        <i className='far fa-laugh-beam'></i> */}
                    <input placeholder='Type your message here!' type='text' onChange={handleChange} value={msgTxt} />
                    {/* <i className='fas fa-microphone'></i> */}
                    <AiOutlineSend fontSize={'2rem'} className='send-btn' onClick={onSend} color='#444444' />
                </div>
            </div>
        </div>
        // </section>
    )
}
{
    /* <div className='message stark'>
                                <div className='typing typing-1'></div>
                                <div className='typing typing-2'></div>
                                <div className='typing typing-3'></div>
                            </div> */
}
