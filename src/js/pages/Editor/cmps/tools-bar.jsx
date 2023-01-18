import { AiOutlineTeam } from 'react-icons/ai'
import { AiOutlineLink } from 'react-icons/ai'
import { AiOutlineMore } from 'react-icons/ai'
import { AiOutlineBars } from 'react-icons/ai'
import { AiOutlineBold } from 'react-icons/ai'
import { AiOutlinePlus } from 'react-icons/ai'
import { GoDeviceDesktop } from 'react-icons/go'
import { BiMobileAlt } from 'react-icons/bi'
import { AiOutlineMobile } from 'react-icons/ai'
import { AiOutlineTablet } from 'react-icons/ai'
import { GrUndo } from 'react-icons/gr'
import { GrRedo } from 'react-icons/gr'
import { FiLayers } from 'react-icons/fi'
import { MdNotificationsNone } from 'react-icons/md'
import { FiMessageSquare } from 'react-icons/fi'
import { CgColorPicker } from 'react-icons/cg'
import { IoColorFilterOutline } from 'react-icons/io5'
import { useState } from 'react'

export function ToolsBar({ isSidebarOpen, onOpenSidebar }) {
    const [currActive, setCurrActive] = useState(null)
    const tools = [
        { toolName: 'add', sidebar: 'left' },
        { toolName: 'layers', sidebar: 'left' },
        { toolName: 'colorPicker', sidebar: 'right' },
        { toolName: 'themes', sidebar: 'left' },
    ]
    function onToolClick({ toolName, sidebar }) {
        sidebar = sidebar === 'left' ? 'add' : 'edit'
        if (toolName === currActive) {
            onOpenSidebar(sidebar, null)
            setCurrActive(null)
            return
        } else {
            onOpenSidebar(sidebar)
            setCurrActive(toolName)
        }
    }
    return (
        <section className='tools-bar full'>
            <div className='tools tools-cmps'>
                {tools.map((tool, idx) => (
                    <button
                        key={idx}
                        onClick={() => onToolClick(tool)}
                        className={`${currActive === tool.toolName ? 'active' : ''} tool`}
                    >
                        {tool.toolName === 'add' && <AiOutlinePlus />}
                        {tool.toolName === 'layers' && <FiLayers />}
                        {tool.toolName === 'colorPicker' && <CgColorPicker />}
                        {tool.toolName === 'themes' && <IoColorFilterOutline />}
                    </button>
                ))}
            </div>
            <div className='tools tools-views flex align-center'>
                <div className='responsive-btns flex align-center'>
                    <button className='tool'>
                        <GoDeviceDesktop />
                    </button>
                    <button className='tool'>
                        <AiOutlineTablet />
                    </button>
                    <button className='tool'>
                        <AiOutlineMobile />
                    </button>
                </div>
            </div>

            <div className='tools tools-views flex align-center'>
                <div className='responsive-btns flex align-center'>
                    <div className='btns-undo-redo flex align-center'>
                        <button className='tool'>
                            <GrUndo />
                        </button>
                        <button className='tool'>
                            <GrRedo />
                        </button>
                    </div>
                    <div className='btns-user-req flex align-center'>
                        <button className='tool'>
                            <MdNotificationsNone />
                        </button>
                        <button className='tool'>
                            <FiMessageSquare />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
