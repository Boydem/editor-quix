import { useRef, useState } from 'react'
import { GrClose } from 'react-icons/gr'
import emailjs from 'emailjs-com'
import { showSuccessMsg } from '../../../services/event-bus.service'

export default function ComposeMail({ subscriberEmail, setIsMailOpen }) {
    const [msg, setMsg] = useState('')
    const formRef = useRef()

    function handleChange(ev) {
        setMsg(ev.target.value)
    }

    function onSend(ev) {
        ev.preventDefault()
        emailjs.sendForm('service_ra3355j', 'template_2k87m98', formRef.current, 'BA6_vXLALxmOosQQV').then(
            result => {
                console.log(result)
                showSuccessMsg('Mail sent successfully')
                setIsMailOpen(false)
            },
            error => {
                console.log(error.text)
            }
        )
    }

    function onClose() {
        setIsMailOpen(false)
    }

    return (
        <form className='compose-mail full' onSubmit={onSend} ref={formRef}>
            <div className='close-btn-wrapper'>
                <button onClick={onClose}>
                    <GrClose fontSize={'1rem'} />
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
                <div className='actions'>
                    <div className='btns'></div>
                    <div className='send'>
                        <button type='submit'>Send now</button>
                    </div>
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
