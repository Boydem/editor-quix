import { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { RiArrowDropRightLine } from 'react-icons/ri'
import { RiArrowDropDownLine } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { saveCmp } from '../../../store/wap/wap.action'
import AccordionDemo from './accordion'

export function EditModules({ setSidebarOpen, setActiveModule, activeModule }) {
    const [openOption, setOpenOption] = useState()
    const lastClickedElem = useSelector(storeState => storeState.wapModule.clickedElem)

    const sizeOptions = [
        { name: 'width', title: 'width', unit: 'px' },
        { name: 'height', title: 'height', unit: 'px' },
        { name: 'minWidth', title: 'min-W', unit: 'px' },
        { name: 'minHeight', title: 'min-h', unit: 'px' },
        { name: 'maxWidth', title: 'max-w', unit: 'px' },
        { name: 'maxHeight', title: 'max-h', unit: 'px' },
    ]

    function handleChange(ev) {
        ev.preventDefault()
        if (!lastClickedElem) return
        const { name, value } = ev.target
        const unit = ev.target.getAttribute('info')
        if (lastClickedElem.style) {
            lastClickedElem.style = { ...lastClickedElem.style, [name]: `${value + unit}` }
        } else {
            lastClickedElem.style = { [name]: `${value + unit}` }
        }
        saveCmp(lastClickedElem)
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
                                    <label htmlFor={option.name}>{option.title}</label>
                                    <input
                                        info={option.unit}
                                        type='number'
                                        name={option.name}
                                        id={option.name}
                                        onChange={handleChange}
                                    />
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
                                    <label htmlFor={option.name}>{option.title}</label>
                                    <input
                                        info={option.unit}
                                        type='number'
                                        name={option.name}
                                        id={option.name}
                                        onChange={handleChange}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
