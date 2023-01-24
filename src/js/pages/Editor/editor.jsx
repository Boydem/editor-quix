import { useEffect, useRef, useState } from 'react'
import { AppHeader } from '../../cmps/app-header'

import { EditorPreview } from './cmps/editor-preview'
import { ToolsBar } from './cmps/tools-bar'
import { DragDropContext } from 'react-beautiful-dnd'

import { wapService } from '../../services/wap.service'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { saveWap, setIsEditing, setWapNull } from '../../store/wap/wap.action'
import { LeftSidebar } from './cmps/left-sidebar'
import { RightSidebar } from './cmps/right-sidebar'

export function Editor() {
    // wap states

    const wap = useSelector(storeState => storeState.wapModule.wap)
    const clickedCmp = useSelector(storeState => storeState.wapModule.clickedCmp)
    // console.log('clickedCmp:', clickedCmp)
    // const [layout, setLayout] = useState({
    //     layoutClass: 'desktopLayout',
    //     width: wap.breakpoints?.desktopLayout || null,
    // })
    const [layout, setLayout] = useState({})
    const { wapId } = useParams()
    const editLayoutRef = useRef()

    // sidebars states
    const [rightSidebarState, setRightSidebarState] = useState({ isOpen: false })
    const [leftSidebarState, setLeftSidebarState] = useState({
        isOpen: true,
        activeMenuItem: null,
        isSubMenuOpen: false,
        isDragging: false,
    })

    useEffect(() => {
        loadWap()
        setIsEditing(true)

        return () => {
            setIsEditing(false)
            setWapNull()
        }
    }, [])

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

    function onLayoutChange(layout) {
        const deafultWidth = { tableLayout: 980, mobileLayout: 500 }
        setLayout({ layoutClass: layout, width: wap.breakpoints[layout] || deafultWidth[layout] })
    }

    function handleOnDragEnd(res) {
        handleSidebarsChanges('left', { isDragging: false })
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
        handleSidebarsChanges('left', { isDragging: true })
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
                    layout={layout}
                    onLayoutChange={onLayoutChange}
                />
                <div className='editor-layout full' ref={editLayoutRef}>
                    <EditorPreview
                        wapCmps={wap.cmps}
                        setRightSidebarState={setRightSidebarState}
                        rightSidebarState={rightSidebarState}
                        layout={layout}
                        handleSidebarsChanges={handleSidebarsChanges}
                    />
                    <RightSidebar rightSidebarState={rightSidebarState} handleSidebarsChanges={handleSidebarsChanges} />
                    <LeftSidebar
                        leftSidebarState={leftSidebarState}
                        handleSidebarsChanges={handleSidebarsChanges}
                        wap={wap}
                        editLayoutRef={editLayoutRef}
                    />
                </div>
            </DragDropContext>
        </>
    )
}
