import { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import emailjs from 'emailjs-com'

export default function ComposeMail({ subscriber, setIsMailOpen }) {
    const [msg, setMsg] = useState('')

    function handleChange(ev) {
        setMsg(ev.target.value)
    }

    function onSend(ev) {
        ev.preventDefault()

        emailjs.sendForm('service_ra3355j', 'template_2k87m98', ev.target, 'BA6_vXLALxmOosQQV').then(
            result => {
                console.log(result)
            },
            error => {
                console.log(error.text)
            }
        )
        console.log(msg)
    }

    function onClose() {
        setIsMailOpen(false)
    }

    return (
        <form className='compose-mail full' onSubmit={onSend}>
            <div className='close-btn-wrapper'>
                <button onClick={onClose}>
                    <AiOutlineClose fontSize={'1rem'} />
                </button>
            </div>
            <div className='to'>
                <p className='weight-700'>To:</p>
                <input value={subscriber.email} name='user_email' readOnly />
            </div>
            <div className='title'>
                <p className='weight-700'>Title:</p>
                <input type='text' />
            </div>
            <div className='mail-container'>
                <textarea id='' rows='10' value={msg} onChange={handleChange} name='message'></textarea>
            </div>
            <div className='actions'>
                <div className='btns'></div>
                <div className='send'>
                    <button type='submit'>Send now</button>
                </div>
            </div>
            <input
                type='text'
                hidden={true}
                value={'CHANGE THIS TO SITE TITLE'}
                name='from_name'
                className='hidden'
                readOnly
            />
        </form>
    )
}
