import { useState } from 'react'
import { AppHeader } from '../../cmps/app-header'
import { AddSidebar } from './cmps/add-side-bar'
import { EditorPreview } from './cmps/editor-preview'
import { ToolsBar } from './cmps/tools-bar'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import { getWap1Template } from '../../wap-templates/wap-template-1/wap-1-template'
import { getWap2Template } from '../../wap-templates/wap-template-2/wap-template-2'

export function Editor() {
    const [isAdding, setIsAdding] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const template = getWap2Template()
    return (
        <>
            <AppHeader />
            <ToolsBar isAdding={isAdding} setIsAdding={setIsAdding} />
            <EditorPreview template={template} />
            {isAdding && <AddSidebar />}
        </>
    )
}
