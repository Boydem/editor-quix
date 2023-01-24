import { useState } from 'react'
import { BiSend } from 'react-icons/bi'
import { utilService } from '../../../services/util.service'
import { saveWap } from '../../../store/wap/wap.action'
import { AiOutlineSend } from 'react-icons/ai'

export function MessagesDashboard({ user, currSite }) {
    // const currSite = user.userData.sites.at(-1)
    console.log('currSite', currSite)
    const [msgs, setMsgs] = useState(currSite.msgs)
    const [currContact, setCurrContact] = useState({ contact: 'guest1', msgs: msgs['guest1'] })
    const [msgTxt, setMsgTxt] = useState('')
    function onContact(keyName) {
        setCurrContact({ contact: keyName, msgs: msgs[keyName] })
    }

    function handleChange(ev) {
        setMsgTxt(ev.target.value)
    }

    function onSend() {
        currContact.msgs.push({ by: 'owner', txt: `${msgTxt}`, date: new Date().getTime() })
        setMsgs(prev => ({ ...prev }))
        saveWap(currSite)
    }
    return (
        <section className='layout-wrapper'>
            <div className='messages-dashboard full'>
                <div className='contacts'>
                    {/* <i className='fas fa-bars fa-2x'></i> */}
                    <h2>Contacts</h2>
                    {Object.keys(msgs).map((keyName, idx) => {
                        return (
                            <div className='contact' key={keyName} onClick={() => onContact(keyName)}>
                                <div className='pic guest'></div>
                                <div className='name'>{keyName}</div>
                                {/* {console.log(msgs[keyName].at(-1).txt)} */}
                                <div className='message'>{msgs[keyName].at(-1).txt.substring(0, 35)}...</div>
                            </div>
                        )
                    })}
                </div>

                <div className='chat'>
                    <div className='chat-layout'>
                        <div className='contact bar'>
                            <div className='pic bigger guest'></div>
                            <div className='wrapper'>
                                <div className='name'>{currContact.contact}</div>
                                <div className='seen'>{utilService.formatTimeAgo(currContact.msgs.at(-1).date)}</div>
                            </div>
                        </div>
                        <div className='messages' id='chat'>
                            <div className='time'>Today at 11:41</div>
                            {currContact.msgs.map((msg, idx) => {
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
                        <input
                            placeholder='Type your message here!'
                            type='text'
                            onChange={handleChange}
                            value={msgTxt}
                        />
                        {/* <i className='fas fa-microphone'></i> */}
                        <AiOutlineSend fontSize={'2rem'} className='send-btn' onClick={onSend} color='#444444' />
                    </div>
                </div>
            </div>
        </section>
    )
}
{
    /* <div className='message stark'>
                                <div className='typing typing-1'></div>
                                <div className='typing typing-2'></div>
                                <div className='typing typing-3'></div>
                            </div> */
}
