import { AiOutlinePlus } from 'react-icons/ai'
import { GoDeviceDesktop } from 'react-icons/go'
import { FiTrash } from 'react-icons/fi'
import { AiOutlineMobile } from 'react-icons/ai'
import { AiOutlineTablet } from 'react-icons/ai'
import { GrUndo } from 'react-icons/gr'
import { GrRedo } from 'react-icons/gr'
import { FiLayers } from 'react-icons/fi'
import { BiBell } from 'react-icons/bi'

import { IoColorFilterOutline } from 'react-icons/io5'
import { removeCmp, undoChange } from '../../../store/wap/wap.action'
import { useSelector } from 'react-redux'
import { TiBrush } from 'react-icons/ti'
import { InteractiveChat } from './ui-cmps/interactive-chat'

export function ToolsBar({ leftSidebarState, rightSidebarState, handleSidebarsChanges, layout, onLayoutChange }) {
    const clickedCmp = useSelector(storeState => storeState.wapModule.clickedCmp)

    const tools = [
        { side: 'left', module: 'add' },
        { side: 'left', module: 'layers' },
        { side: 'left', module: 'themes' },
    ]
    function onToolClick(side, stateChanges) {
        if (stateChanges.currModule === leftSidebarState.currModule) {
            handleSidebarsChanges(side, {
                isOpen: false,

                currModule: null,
                isSubMenuOpen: !leftSidebarState.isSubMenuOpen,
            })
            return
        } else {
            handleSidebarsChanges(side, { ...stateChanges })
        }
    }

    function onRemoveCmp() {
        if (clickedCmp) {
            removeCmp(clickedCmp)
        }
    }

    function onUndo() {
        undoChange()
    }

    return (
        <section className='tools-bar full'>
            <div className='left-side'>
                <div className='tools tools-cmps'>
                    {tools.map((tool, idx) => (
                        <button
                            data-tooltip={`${tool.module}`}
                            data-tooltip-dir='bottom'
                            key={idx}
                            onClick={() =>
                                onToolClick(tool.side, {
                                    isOpen: true,
                                    currModule: tool.module,
                                    activeMenuItem: null,
                                    isSubMenuOpen: tool.module === 'add' ? false : true,
                                })
                            }
                            className={`${leftSidebarState.currModule === tool.module ? 'active' : ''} tool`}
                        >
                            {/* {tool.module === 'add' && <AiOutlinePlus />} */}
                            {tool.module === 'add' && <AiOutlinePlus />}
                            {tool.module === 'layers' && <FiLayers />}
                            {tool.module === 'themes' && <IoColorFilterOutline />}
                        </button>
                    ))}
                </div>
            </div>
            <div className='center'>
                <div className='tools responsive tools-views flex align-center'>
                    <div className='responsive-btns flex align-center interactives'>
                        <button
                            onClick={() => onLayoutChange('desktopLayout')}
                            data-tooltip='Desktop'
                            data-tooltip-dir='bottom'
                            className={`tool  ${layout.layoutClass === 'desktopLayout' ? 'active' : ''}`}
                        >
                            <GoDeviceDesktop />
                        </button>
                        <button
                            onClick={() => onLayoutChange('tabletLayout')}
                            data-tooltip='Tablet'
                            data-tooltip-dir='bottom'
                            className={`tool  ${layout.layoutClass === 'tabletLayout' ? 'active' : ''}`}
                        >
                            <AiOutlineTablet />
                        </button>
                        <button
                            onClick={() => onLayoutChange('mobileLayout')}
                            data-tooltip='Mobile'
                            data-tooltip-dir='bottom'
                            className={`tool  ${layout.layoutClass === 'mobileLayout' ? 'active' : ''}`}
                        >
                            <AiOutlineMobile />
                        </button>
                    </div>
                    <div className='responsive-btns interactives curr-width'>
                        {/* <input type='number' name='currMediaQuery' value={1920} /> */}
                    </div>
                </div>
            </div>

            <div className='tools tools-views'>
                <div className='responsive-btns flex align-center interactives'>
                    <div className='btns-undo-redo flex align-center'>
                        <button className='tool' data-tooltip='Undo' data-tooltip-dir='bottom' onClick={onUndo}>
                            <GrUndo />
                        </button>
                        <button className='tool' data-tooltip='Redo' data-tooltip-dir='bottom'>
                            <GrRedo />
                        </button>
                    </div>
                    <div className='flex align-center interactives'>
                        <InteractiveChat />
                    </div>
                    <div className='flex align-center'>
                        <button
                            data-tooltip='Edit'
                            data-tooltip-dir='bottom'
                            onClick={() =>
                                onToolClick('right', {
                                    isOpen: !rightSidebarState.isOpen,
                                    currModule: 'Edit',
                                    isSubMenuOpen: true,
                                })
                            }
                            className={`${rightSidebarState.isOpen ? 'active' : ''} tool`}
                        >
                            <TiBrush />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
