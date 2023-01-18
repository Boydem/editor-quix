import { useEffect, useState } from 'react'
import { AppHeader } from '../../cmps/app-header'
import { Sidebar } from './cmps/sidebar'
import { EditorPreview } from './cmps/editor-preview'
import { ToolsBar } from './cmps/tools-bar'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import { getWap1Template } from '../../wap-templates/wap-template-1/wap-1-template'
import { getWap2Template } from '../../wap-templates/wap-template-2/wap-2-template'
import { wapService } from '../../services/wap.service'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { saveWap, setSidebarContext } from '../../store/wap/wap.action'

export function Editor() {
    const template = useSelector(storeState => storeState.wapModule.wap)
    const [isSidebarOpen, setSidebarOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const sidebarContext = useSelector(storeState => storeState.wapModule.sidebarContext)

    // const currSide =
    const { wapId } = useParams()
    useEffect(() => {
        loadWap()
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
        if (result.source.droppableId !== 'editor-preview') {
            const newCmp = wapService.getCmpById(result.draggableId)
            console.log(newCmp)
            template.cmps.splice(result.destination.index, 0, newCmp)
            saveWap(template)
            return
        }
        const [reorderedItem] = template.cmps.splice(result.source.index, 1)
        template.cmps.splice(result.destination.index, 0, reorderedItem)
        saveWap(template)
        // wapService.save(template)
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
                <Sidebar
                    context={sidebarContext}
                    isEditing={isEditing}
                    isSidebarOpen={isSidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />
            </DragDropContext>
        </>
    )
}
