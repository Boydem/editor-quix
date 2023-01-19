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
    const template = useSelector(storeState => storeState.wapModule.wap)
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
        let template = await wapService.get(wapId)
        saveWap(template)
    }

    function handleOnDragEnd(result) {
        let changedCmp
        if (result.source.droppableId !== 'editor-preview' && result.destination.droppableId === 'editor-preview') {
            changedCmp = wapService.getCmpById(result.source.droppableId, result.draggableId)
        } else {
            ;[changedCmp] = template.cmps.splice(result.source.index, 1)
        }
        template.cmps.splice(result.destination.index, 0, changedCmp)
        saveWap(template)
    }

    function handleOnDragStart() {
        // setSidebarOpen(false)
    }
    if (Object.keys(template).length === 0) return
    return (
        <>
            <DragDropContext onDragEnd={handleOnDragEnd} onDragStart={handleOnDragStart}>
                <AppHeader />
                <ToolsBar isSidebarOpen={isSidebarOpen} onOpenSidebar={onOpenSidebar} />
                <EditorPreview templateOrder={template.cmps} />
                <Sidebar context={sidebarContext} isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
            </DragDropContext>
        </>
    )
}
