import { useEffect, useState } from 'react'
import { AppHeader } from '../../cmps/app-header'
import { Sidebar } from './cmps/sidebar'
import { EditorPreview } from './cmps/editor-preview'
import { ToolsBar } from './cmps/tools-bar'
import { DragDropContext } from 'react-beautiful-dnd'

import { wapService } from '../../services/wap.service'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { saveWap, setIsEditing, setSidebarContext } from '../../store/wap/wap.action'

export function Editor() {
    const wap = useSelector(storeState => storeState.wapModule.wap)
    const [isSidebarOpen, setSidebarOpen] = useState(false)
    const sidebarContext = useSelector(storeState => storeState.wapModule.sidebarContext)
    const { wapId } = useParams()
    
    useEffect(() => {
        loadWap()
        setIsEditing(true)

        return () => {
            setIsEditing(false)
        }
    }, [])

    function onOpenSidebar(context, isOpen = true) {
        setSidebarContext(context)
        setSidebarOpen(isOpen)
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
                <ToolsBar isSidebarOpen={isSidebarOpen} onOpenSidebar={onOpenSidebar} />
                <EditorPreview wapCmps={wap.cmps} />
                <Sidebar context={sidebarContext} isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
            </DragDropContext>
        </>
    )
}
