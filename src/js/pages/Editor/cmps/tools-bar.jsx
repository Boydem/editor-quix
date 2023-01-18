import { AiOutlineTeam } from 'react-icons/ai'
import { AiOutlineLink } from 'react-icons/ai'
import { AiOutlineMore } from 'react-icons/ai'
import { AiOutlineBars } from 'react-icons/ai'
import { AiOutlineBold } from 'react-icons/ai'
import { AiOutlinePlus } from 'react-icons/ai'
import { BiDesktop } from 'react-icons/bi'
import { FiLayers } from 'react-icons/fi'
import { CgColorPicker } from 'react-icons/cg'
import { IoColorFilterOutline } from 'react-icons/io5'

export function ToolsBar({ isSidebarOpen, setSidebarOpen }) {
    return (
        <section className='tools-bar full'>
            <div className='tools tools-cmps flex'>
                <button
                    onClick={() => setSidebarOpen(prev => !prev)}
                    className={`${isSidebarOpen ? 'active' : ''} tool`}
                >
                    <AiOutlinePlus />
                </button>
                <button className='tool'>
                    <FiLayers />
                </button>
                <button className='tool'>
                    <CgColorPicker />
                </button>
                <button className='tool'>
                    <IoColorFilterOutline />
                </button>

                <button className='tool'>
                    <AiOutlineBars />
                </button>
                <button className='tool'>
                    <AiOutlineMore />
                </button>
            </div>
            <div className='tools tools-views'>
                <div className='responsive-btns'>
                    <button className='tool'>
                        <BiDesktop />
                    </button>
                </div>
            </div>
        </section>
    )
}
