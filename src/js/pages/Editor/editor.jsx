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
import { socketService } from '../../services/socket.service'
import { useDispatch } from 'react-redux'
import { SET_WAP } from '../../store/wap/wap.reducer'
import { Loader } from '../../cmps/loader'

export function Editor() {
    // wap states

    const wap = useSelector(storeState => storeState.wapModule.wap)
    const clickedCmp = useSelector(storeState => storeState.wapModule.clickedCmp)
    const [layout, setLayout] = useState({ layoutClass: 'desktopLayout', width: '' })
    const cursorRef = useRef()
    const { wapId } = useParams()
    const dispatch = useDispatch()

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
        setInterval(() => {
            cursorRef.current.style.display = 'none'
        }, 3500)
        socketService.emit('set-wap-room', wapId)
        socketService.on('updated-wap', wap => {
            dispatch({ type: SET_WAP, wap })
        })
        socketService.on('mouse-move', mousePos => {
            cursorRef.current.style.left = `${mousePos.mouseX + 10}px`
            cursorRef.current.style.top = `${mousePos.mouseY - 10}px`
            cursorRef.current.style.display = 'block'
            // console.log(mousePos)
        })

        document.addEventListener('mousemove', emitMouseMovement)
        function emitMouseMovement(ev) {
            // console.log('ev.layerY', ev.layerY)
            // console.log('ev.layerX:', ev.layerX)
            socketService.emit('update-mouse-pos', { mouseX: ev.clientX, mouseY: ev.clientY })
        }

        return () => {
            setIsEditing(false)
            setWapNull()
            document.removeEventListener('mousemove', emitMouseMovement)
        }
    }, [])

    useEffect(() => {
        handleSidebarsChanges('right', { context: clickedCmp?.type || 'Edit' })
    }, [clickedCmp])

    function handleSidebarsChanges(side, stateChanges) {
        if (side === 'right') {
            setRightSidebarState(prevState => ({ ...prevState, ...stateChanges }))
            setLeftSidebarState(prevState => ({ ...prevState, isOpen: false }))
            return
        }
        setRightSidebarState(prevState => ({ ...prevState, isOpen: false }))
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
        const deafultWidth = { desktopLayout: '', tabletLayout: 680, mobileLayout: 480 }
        setLayout({ layoutClass: layout, width: deafultWidth[layout] })
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

    if (Object.keys(wap).length === 0 || !wap.cmps || !wap) return <Loader />
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
                <div className='editor-layout full'>
                    <EditorPreview
                        wapCmps={wap.cmps}
                        leftSidebarState={leftSidebarState}
                        rightSidebarState={rightSidebarState}
                        layout={layout}
                        handleSidebarsChanges={handleSidebarsChanges}
                    />
                    <RightSidebar rightSidebarState={rightSidebarState} handleSidebarsChanges={handleSidebarsChanges} />
                    <LeftSidebar
                        leftSidebarState={leftSidebarState}
                        handleSidebarsChanges={handleSidebarsChanges}
                        wap={wap}
                    />
                    <img
                        className='mouse-pos'
                        src='https://res.cloudinary.com/yaronshapira-com/image/upload/v1675024210/output-onlinepngtools_3_so2o9a.png'
                        alt=''
                        ref={cursorRef}
                    />
                </div>
            </DragDropContext>
        </>
    )
}
