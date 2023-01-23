import { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

export default function ComposeMail({ subscriber, setIsMailOpen }) {
    const [msg, setMsg] = useState('')

    function handleChange(ev) {
        setMsg(ev.target.value)
    }

    function onSend() {
        console.log(msg)
    }

    function onClose() {
        setIsMailOpen(false)
    }

    return (
        <div className='compose-mail full'>
            <div className='close-btn-wrapper'>
                <button onClick={onClose}>
                    <AiOutlineClose fontSize={'1rem'} />
                </button>
            </div>
            <div className='to'>
                <p className='weight-700'>To:</p>
                <p>{subscriber.email}</p>
            </div>
            <div className='title'>
                <p className='weight-700'>Title:</p>
                <input type='text' />
            </div>
            <div className='mail-container'>
                <textarea name='' id='' rows='10' value={msg} onChange={handleChange}></textarea>
            </div>
            <div className='actions'>
                <div className='btns'></div>
                <div className='send'>
                    <button onClick={onSend}>Send now</button>
                </div>
            </div>
        </div>
    )
}
