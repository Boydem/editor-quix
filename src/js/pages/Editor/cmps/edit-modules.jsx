import { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { RiArrowDropRightLine } from 'react-icons/ri'
import { RiArrowDropDownLine } from 'react-icons/ri'
import AccordionDemo from './accordion'

export function EditModules({ setSidebarOpen, setActiveModule, activeModule }) {
    const sizeOptions = ['width', 'height', 'min-W', 'min-h', 'max-w', 'max-h']
    const [openOption, setOpenOption] = useState()

    function handleChange(ev) {
        ev.preventDefault()
        console.log('ev.value:', ev.value)
    }

    return (
        <div className='edit-modules'>
            <div className='module-content'>
                <div className='module-header'>
                    <span className='module-name'>Edit</span>
                    <div className='actions'>
                        <span
                            onClick={() => {
                                setSidebarOpen(prev => !prev)
                            }}
                            className='btn'
                        >
                            <AiOutlineClose />
                        </span>
                    </div>
                </div>
                <AccordionDemo />
                <div className='options-accordion'>
                    <div className='option'>
                        <div className='option-header'>
                            <span className='label'>Size</span>
                            <span className='collapse-icon'>
                                <RiArrowDropRightLine />
                            </span>
                        </div>
                        <div className='option-body'>
                            {sizeOptions.map((option, idx) => (
                                <div key={idx} className='param-box'>
                                    <label htmlFor={option}>{option}</label>
                                    <input type='number' name={option} id={option} onChange={handleChange} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='option'>
                        <div className='option-header'>
                            <span className='label'>Size</span>
                            <span className='collapse-icon'>
                                <RiArrowDropRightLine />
                            </span>
                        </div>
                        <div className='option-body'>
                            {sizeOptions.map((option, idx) => (
                                <div key={idx} className='param-box'>
                                    <label htmlFor={option}>{option}</label>
                                    <input type='number' name={option} id={option} onChange={handleChange} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
