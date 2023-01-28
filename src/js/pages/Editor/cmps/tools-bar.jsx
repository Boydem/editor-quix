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
import { useState } from 'react'
import { showSuccessMsg } from '../../../services/event-bus.service'

export function ToolsBar({ rightSidebarState, leftSidebarState, handleSidebarsChanges, layout, onLayoutChange }) {
    const clickedCmp = useSelector(storeState => storeState.wapModule.clickedCmp)
    const isSaving = useSelector(storeState => storeState.wapModule.isSaving)
    const wap = useSelector(storeState => storeState.wapModule.wap)
    const [wapUrlToEdit, setWapUrlToEdit] = useState({ publishUrl: '' })
    function handleChange(ev) {
        const value = ev.target.value
        const field = ev.target.name
        setWapUrlToEdit(prev => ({ ...prev, [field]: value }))
    }
    function openLeftSidebar() {
        handleSidebarsChanges('left', { isOpen: !leftSidebarState.isOpen })
    }

    function onEditDomain() {
        if (!wap.url) return
        wap.url = wapUrlToEdit.publishUrl
        showSuccessMsg('Your site URL has been updated!')
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
            <ul className='icons-group b-r b-l add-icon'>
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
            {/* {wap.owner !== 'guest' && (
                <div className='curr-site-name'>
                    <pre className='prefix'>Currently editing </pre> <span className='name'>{wap.title}</span>
                </div>
            )} */}
            <div className={`save-msg flex align-center ${isSaving ? 'shown' : ''}`}>
                <FiRefreshCw className='refresh-icon' />
                Saving...
            </div>
            {wap.url && (
                <div className='site-link'>
                    <label className='publish-url-prefix' htmlFor='publishUrl'>
                        quix.io/
                        <input
                            onChange={handleChange}
                            value={wap?.url || wapUrlToEdit.publishUrl}
                            type='text'
                            name='publishUrl'
                            id='publishUrl'
                            placeholder='MySite'
                        />
                        <button onClick={onEditDomain} className='btn-publish'>
                            {wap.url && 'Edit your domain'}
                        </button>
                    </label>
                </div>
            )}

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
                <li className='icon-container edit-icon'>
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
