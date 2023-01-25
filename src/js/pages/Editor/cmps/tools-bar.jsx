import { GoDeviceDesktop } from 'react-icons/go'
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
            <ul className='icons-group b-r b-l'>
                <li className='icon-container'>
                    <button
                        className={`${leftSidebarState.isOpen ? 'active' : ''} btn-icon`}
                        data-tooltip='Add'
                        data-tooltip-dir='bottom'
                        onClick={openLeftSidebar}
                    >
                        <AiOutlinePlus />
                    </button>
                </li>
            </ul>
            <ul className='icons-group responsive-btns b-r'>
                <li className='icon-container'>
                    <button
                        className={`${layout.layoutClass === 'desktopLayout' ? 'active' : ''} btn-icon`}
                        data-tooltip='Desktop'
                        data-tooltip-dir='bottom'
                        onClick={() => onLayoutChange('desktopLayout')}
                    >
                        <GoDeviceDesktop />
                    </button>
                </li>
                <li className='icon-container'>
                    <button
                        onClick={() => onLayoutChange('tabletLayout')}
                        data-tooltip='Tablet'
                        data-tooltip-dir='bottom'
                        className={`btn-icon  ${layout.layoutClass === 'tabletLayout' ? 'active' : ''}`}
                    >
                        <AiOutlineTablet />
                    </button>
                </li>
                <li className='icon-container '>
                    <button
                        onClick={() => onLayoutChange('mobileLayout')}
                        data-tooltip='Mobile'
                        data-tooltip-dir='bottom'
                        className={`btn-icon  ${layout.layoutClass === 'mobileLayout' ? 'active' : ''}`}
                    >
                        <AiOutlineMobile />
                    </button>
                </li>
            </ul>
            <div className={`save-msg flex align-center ${isSaving ? 'shown' : ''}`}>
                <FiRefreshCw className='refresh-icon' />
                Saving...
            </div>
            <ul className='icons-group'>
                <li className='icon-container b-l'>
                    <button className='btn-icon' data-tooltip='Undo' data-tooltip-dir='bottom' onClick={onUndo}>
                        <GrUndo />
                    </button>
                </li>
                <li className='icon-container b-r'>
                    <button className='btn-icon' data-tooltip='Redo' data-tooltip-dir='bottom' onClick={onRedo}>
                        <GrRedo />
                    </button>
                </li>
                <li className='icon-container b-r'>
                    <InteractiveChat />
                </li>
                <li className='icon-container'>
                    <button
                        data-tooltip='Edit'
                        data-tooltip-dir='bottom'
                        onClick={() =>
                            handleSidebarsChanges('right', {
                                isOpen: !rightSidebarState.isOpen,
                            })
                        }
                        className={`${rightSidebarState.isOpen ? 'active' : ''} btn-icon`}
                    >
                        <TiBrush />
                    </button>
                </li>
            </ul>
        </section>
    )
}
