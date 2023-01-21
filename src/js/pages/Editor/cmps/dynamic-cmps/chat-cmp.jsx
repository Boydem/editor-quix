import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import DynamicCmp from '../dynamic-cmp'
import DynamicElement from './dynamic-element'
import { BsChatFill } from 'react-icons/bs'
import { AiOutlineSend } from 'react-icons/ai'
import { makeId } from '../../../../services/util.service'
import { saveCmp } from '../../../../store/wap/wap.action'

export function ChatCmp({ cmp, handleClick, onHover, selectedActionsRef }) {
    const clickedCmp = useSelector(storeState => storeState.wapModule.clickedCmp)
    const chatRef = useRef()

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
        console.log('SENDING', msg)
        msgsCmp.messages.push({ by: 'customer', txt: `${msg}` })
        setMsg('')
        saveCmp(msgsCmp)
    }
    const msgsCmp = cmp?.cmps[1]?.cmps[1]
    const chatInputCmp = cmp?.cmps[1]?.cmps.at(-1)

    return (
        <div
            className={cmp.name}
            style={cmp.style}
            onClick={e => handleClick(e, cmp)}
            onMouseOver={onHover}
            onMouseOut={ev => ev.currentTarget.classList.remove('hover')}
            onSubmit={onSubmit}
        >
            <button
                className={cmp.cmps[0].name}
                style={cmp.style}
                // onClick={e => handleClick(e, cmp)}
                onClick={onOpenChat}
                onMouseOver={onHover}
                onMouseOut={ev => ev.currentTarget.classList.remove('hover')}
                spellCheck='false'
            >
                <BsChatFill size={'1.3rem'} />
            </button>
            <div
                className={cmp.cmps[1].name}
                style={cmp.style}
                onClick={e => handleClick(e, cmp)}
                onMouseOver={onHover}
                onMouseOut={ev => ev.currentTarget.classList.remove('hover')}
                ref={chatRef}
            >
                {cmp.cmps[1].cmps?.map(c => {
                    return <DynamicCmp cmp={c} key={c.id} selectedActionsRef={selectedActionsRef} />
                })}
                <div className='messages'>
                    {msgsCmp.messages?.map((msg, idx) => {
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
                        onClick={e => handleClick(e, cmp)}
                        placeholder={cmp.content?.placeholder}
                        onMouseOver={onHover}
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
