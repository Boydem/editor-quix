import { AppHeader } from '../../cmps/app-header'
import { ToolsBar } from './cmps/tools-bar'

export function Editor() {
    return (
        <>
            <AppHeader />
            <ToolsBar />
            <div className='editor'>Editor</div>
        </>
    )
}
