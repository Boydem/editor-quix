import { AiOutlineTeam } from 'react-icons/ai'
import { AiOutlineLink } from 'react-icons/ai'
import { AiOutlineMore } from 'react-icons/ai'
import { AiOutlineBars } from 'react-icons/ai'
import { AiOutlineBold } from 'react-icons/ai'
import { AiOutlinePlus } from 'react-icons/ai'
import { FiLayers } from 'react-icons/fi'
import { CgColorPicker } from 'react-icons/cg'
import { IoColorFilterOutline } from 'react-icons/io5'

export function ToolsBar({ isAdding, setIsAdding }) {
    return (
        <section className='tools-bar full'>
            <ul className='tools flex'>
                <li onClick={() => setIsAdding(!isAdding)} className={`${isAdding && 'active'} tool`}>
                    <AiOutlinePlus />
                </li>
                <li className='tool'>
                    <FiLayers />
                </li>
                <li className='tool'>
                    <CgColorPicker />
                </li>
                <li className='tool'>
                    <IoColorFilterOutline />
                </li>

                <li className='tool'>
                    <AiOutlineBars />
                </li>
                <li className='tool'>
                    <AiOutlineMore />
                </li>
            </ul>
        </section>
    )
}
