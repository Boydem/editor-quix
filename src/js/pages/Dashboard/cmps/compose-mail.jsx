import { useRef, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import emailjs from 'emailjs-com'

export default function ComposeMail({ subscriberEmail, setIsMailOpen }) {
    const [msg, setMsg] = useState('')
    const formRef = useRef()

    function handleChange(ev) {
        setMsg(ev.target.value)
    }

    function onSend(ev) {
        ev.preventDefault()
        // console.log(formRef.current)
        emailjs.sendForm('service_ra3355j', 'template_2k87m98', formRef.current, 'BA6_vXLALxmOosQQV').then(
            result => {
                console.log(result)
            },
            error => {
                console.log(error.text)
            }
        )
        // console.log(msg)
    }

    function onClose() {
        setIsMailOpen(false)
    }
    

    return (
        <form className='compose-mail full' onSubmit={onSend} ref={formRef}>
            <div className='close-btn-wrapper'>
                <button onClick={onClose}>
                    <AiOutlineClose fontSize={'1rem'} />
                </button>
            </div>
            <div className='to'>
                <p className='weight-700'>To:</p>
                <input value={subscriberEmail} name='user_email' readOnly type='email' id='user_email' />
            </div>
            <div className='title'>
                <p className='weight-700'>Title:</p>
                <input type='text' />
            </div>
            <div className='mail-container'>
                <textarea id='' rows='14' value={msg} onChange={handleChange} name='message'></textarea>
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
            <input type='text' hidden={true} value={subscriberEmail} name='user_name' className='hidden' readOnly />
            <input type='text' hidden={true} value={subscriberEmail} name='user_email' className='hidden' readOnly />
        </form>
    )
}
