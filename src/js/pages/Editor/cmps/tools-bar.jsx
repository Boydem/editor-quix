import { GoDeviceDesktop } from 'react-icons/go'
import { FiTrash } from 'react-icons/fi'
import { AiOutlineMobile } from 'react-icons/ai'
import { AiOutlineTablet } from 'react-icons/ai'
import { GrUndo } from 'react-icons/gr'
import { GrRedo } from 'react-icons/gr'
import { AiOutlinePlus } from 'react-icons/ai'
import { FiRefreshCw } from 'react-icons/fi'

import { redoChange, removeCmp, undoChange } from '../../../store/wap/wap.action'
import { useSelector } from 'react-redux'
import { TiBrush } from 'react-icons/ti'
import { InteractiveChat } from './ui-cmps/interactive-chat'
import { useState } from 'react'

export function ToolsBar({ rightSidebarState, leftSidebarState, handleSidebarsChanges, layout, onLayoutChange }) {
    const clickedCmp = useSelector(storeState => storeState.wapModule.clickedCmp)
    const isSaving = useSelector(storeState => storeState.wapModule.isSaving)

    function openLeftSidebar() {
        handleSidebarsChanges('left', { isOpen: !leftSidebarState.isOpen })
    }

    function onRemoveCmp() {
        if (clickedCmp) {
            removeCmp(clickedCmp)
        }
    }

    function onUndo() {
        undoChange()
    }

    function onRedo() {
        redoChange()
    }

    return (
        <section className='tools-bar full'>
            <div className='left-side'>
                <div className='tabs responsive tabs-views flex align-center'>
                    <button
                        className={`${leftSidebarState.isOpen ? 'active' : ''} tab`}
                        data-tooltip='Add'
                        data-tooltip-dir='bottom'
                        onClick={openLeftSidebar}
                    >
                        <AiOutlinePlus />
                    </button>
                    <div className='responsive-btns flex align-center interactives'>
                        <button
                            onClick={() => onLayoutChange('desktopLayout')}
                            data-tooltip='Desktop'
                            data-tooltip-dir='bottom'
                            className={`tab  ${layout.layoutClass === 'desktopLayout' ? 'active' : ''}`}
                        >
                            <GoDeviceDesktop />
                        </button>
                        <button
                            onClick={() => onLayoutChange('tabletLayout')}
                            data-tooltip='Tablet'
                            data-tooltip-dir='bottom'
                            className={`tab  ${layout.layoutClass === 'tabletLayout' ? 'active' : ''}`}
                        >
                            <AiOutlineTablet />
                        </button>
                        <button
                            onClick={() => onLayoutChange('mobileLayout')}
                            data-tooltip='Mobile'
                            data-tooltip-dir='bottom'
                            className={`tab  ${layout.layoutClass === 'mobileLayout' ? 'active' : ''}`}
                        >
                            <AiOutlineMobile />
                        </button>
                    </div>

                    <div className={`save-msg flex align-center ${isSaving ? 'shown' : ''}`}>
                        <FiRefreshCw className='refresh-icon' />
                        Saving...
                    </div>
                </div>
            </div>

            <div className='tabs tabs-views'>
                <div className='responsive-btns flex align-center interactives'>
                    <div className='btns-undo-redo flex align-center'>
                        <button className='tab' data-tooltip='Undo' data-tooltip-dir='bottom' onClick={onUndo}>
                            <GrUndo />
                        </button>
                        <button className='tab' data-tooltip='Redo' data-tooltip-dir='bottom' onClick={onRedo}>
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
                                handleSidebarsChanges('right', {
                                    isOpen: !rightSidebarState.isOpen,
                                    isSubMenuOpen: true,
                                })
                            }
                            className={`${rightSidebarState.isOpen ? 'active' : ''} tab`}
                        >
                            <TiBrush />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
