import { AppHeader } from '../../cmps/app-header'
import { EditorPreview } from './cmps/editor-preview'
import { ToolsBar } from './cmps/tools-bar'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useState } from 'react'
import { getWap1Template } from '../../wap-templates/wap-template-1/wap-1-template'

export function Editor() {
    const template = getWap1Template()

    return (
        <>
            <AppHeader />
            <ToolsBar />
            <EditorPreview template={template} />
        </>
    )
}
