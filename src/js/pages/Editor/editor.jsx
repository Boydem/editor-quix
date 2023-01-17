import { useState } from 'react'
import { AppHeader } from '../../cmps/app-header'
import { AddSidebar } from './cmps/add-side-bar'
import { ToolsBar } from './cmps/tools-bar'

export function Editor() {
    const [isAdding, setIsAdding] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    return (
        <>
            <AppHeader />
            <ToolsBar isAdding={isAdding} setIsAdding={setIsAdding} />
            <div className='editor'>Editor</div>
            {isAdding && <AddSidebar />}
        </>
    )
}
