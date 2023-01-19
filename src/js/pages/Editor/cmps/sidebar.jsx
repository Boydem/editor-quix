import { useState } from 'react'

import { AddModules } from './add-modules'
import { EditModules } from './edit-modules'

export function Sidebar({ setSidebarOpen, isSidebarOpen, context }) {
    return <section className={`${isSidebarOpen ? 'open' : ''} ${context} side-bar`}></section>
}
