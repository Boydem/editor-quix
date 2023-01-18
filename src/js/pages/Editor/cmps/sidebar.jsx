import { useState } from 'react'

import { AddModules } from './add-modules'
import { EditModules } from './edit-modules'

export function Sidebar({ setSidebarOpen, isSidebarOpen, context }) {
    const [activeModule, setActiveModule] = useState('Quick add')
    const addModulesMenuItems = [
        ['Quick add', 'Assets'],
        ['Header', 'Hero', 'Section', 'Card', 'Footer', 'Media', 'Decorative', 'Contact & Forms', 'Embed & Social'],
        ['Cards', 'Galleries', 'Members', 'Section'],
    ]
    const editModules = ['Text', 'Image', 'Section']
    return (
        <section className={`${isSidebarOpen ? 'open' : ''} ${context} side-bar`}>
            <AddModules
                setSidebarOpen={setSidebarOpen}
                setActiveModule={setActiveModule}
                activeModule={activeModule}
                addModulesMenuItems={addModulesMenuItems}
            />
            <EditModules
                setSidebarOpen={setSidebarOpen}
                setActiveModule={setActiveModule}
                activeModule={activeModule}
            />
        </section>
    )
}
