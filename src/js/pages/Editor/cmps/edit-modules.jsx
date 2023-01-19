import { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { RiArrowDropRightLine } from 'react-icons/ri'
import { RiArrowDropDownLine } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { saveCmp } from '../../../store/wap/wap.action'
import AccordionEdit from './accordion'

export function EditModules({ isSidebarOpen, setSidebarOpen }) {
    return (
        <div className={`${isSidebarOpen ? 'open' : ''} edit-modules`}>
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
                <AccordionEdit />
            </div>
        </div>
    )
}
