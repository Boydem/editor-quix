import { useEffect, useRef, useState } from 'react'
import { AppHeader } from '../../cmps/app-header'

import { EditorPreview } from './cmps/editor-preview'
import { ToolsBar } from './cmps/tools-bar'
import { DragDropContext } from 'react-beautiful-dnd'

import { wapService } from '../../services/wap.service'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { saveWap, setIsEditing } from '../../store/wap/wap.action'
import { LeftSidebar } from './cmps/left-sidebar'
import { RightSidebar } from './cmps/right-sidebar'
import { FiEdit2 } from 'react-icons/fi'

export function Editor() {
    // wap states
    const wap = useSelector(storeState => storeState.wapModule.wap)
    const clickedCmp = useSelector(storeState => storeState.wapModule.clickedCmp)
    const { wapId } = useParams()

    // sidebars states
    const [rightSidebarState, setRightSidebarState] = useState({ context: null, isOpen: false, currModule: null })
    const [leftSidebarState, setLeftSidebarState] = useState({
        context: null,
        isOpen: false,
        prevModule: null,
        currModule: 'add',
        activeMenuItem: 'quick add',
        isSubMenuOpen: false,
    })

    useEffect(() => {
        loadWap()
        setIsEditing(true)

        return () => {
            setIsEditing(false)
        }
    }, [])
    // console.log(rightSidebarState.context)

    useEffect(() => {
        handleSidebarsChanges('right', { context: clickedCmp?.type || 'Edit' })
    }, [clickedCmp])

    function handleSidebarsChanges(side, stateChanges) {
        if (side === 'right') {
            setRightSidebarState(prevState => ({ ...prevState, ...stateChanges }))
            return
        }
        setLeftSidebarState(prevState => ({ ...prevState, ...stateChanges }))
    }

    async function loadWap() {
        try {
            let wap = await wapService.get(wapId)
            saveWap(wap)
        } catch (err) {
            console.log(err)
        }
    }

    function handleOnDragEnd(res) {
        let changedCmp
        if (res.source.droppableId !== 'editor-preview' && res.destination.droppableId === 'editor-preview') {
            changedCmp = wapService.getCmpById(res.source.droppableId, res.draggableId)
        } else {
            ;[changedCmp] = wap.cmps.splice(res.source.index, 1)
        }
        wap.cmps.splice(res.destination.index, 0, changedCmp)
        saveWap(wap)
    }

    function handleOnDragStart() {
        // setSidebarOpen(false)
    }
    if (Object.keys(wap).length === 0) return
    return (
        <>
            <DragDropContext onDragEnd={handleOnDragEnd} onDragStart={handleOnDragStart}>
                <AppHeader />
                <ToolsBar
                    leftSidebarState={leftSidebarState}
                    rightSidebarState={rightSidebarState}
                    handleSidebarsChanges={handleSidebarsChanges}
                />
                <div className='editor-layout full'>
                    <EditorPreview wapCmps={wap.cmps} setRightSidebarState={setRightSidebarState} />
                    <RightSidebar rightSidebarState={rightSidebarState} handleSidebarsChanges={handleSidebarsChanges} />
                    <LeftSidebar leftSidebarState={leftSidebarState} handleSidebarsChanges={handleSidebarsChanges} />
                </div>
            </DragDropContext>
        </>
    )
}
