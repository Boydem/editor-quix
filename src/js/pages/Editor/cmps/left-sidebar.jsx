import { DynamicModule } from './dynamic-module'
import { AiOutlineClose } from 'react-icons/ai'
import { saveCmp } from '../../../store/wap/wap.action'
import { useEffect, useState } from 'react'
import { wapService } from '../../../services/wap.service'

export function LeftSidebar({ leftSidebarState, handleSidebarsChanges, wap }) {
    const [theme, setTheme] = useState('')
    const addMenuItems = [
        ['Quick add', 'Assets'],
        ['Header', 'Hero', 'Section', 'Card', 'Footer', 'Media', 'Decorative', 'Contact & Forms', 'Embed & Social'],
        ['Cards', 'Galleries', 'Members', 'Section'],
    ]

    function handleSidebar(sidebarChanges) {
        handleSidebarsChanges('left', sidebarChanges)
    }
    useEffect(() => {
        setThemeClass()
    }, [])

    function setThemeClass() {
        const root = document.getElementById('root')
        root.classList.add(wap.themeClass)
    }

    function handleThemeChange(selectedTheme) {
        const root = document.getElementById('root')
        if (theme) root.classList.remove(theme)
        root.classList.add(selectedTheme)
        setTheme(selectedTheme)
        wap.themeClass = selectedTheme
        wapService.save(wap)
    }

    return (
        <div className={`left-sidebar ${leftSidebarState.isOpen ? 'open' : ''} ${leftSidebarState.currModule}`}>
            {
                <div className={`${leftSidebarState.currModule} module-menu`}>
                    {addMenuItems.map((menuItem, idx) => (
                        <ul key={idx} className='menu-items'>
                            {menuItem.map(module => (
                                <li
                                    className={leftSidebarState.currModule === module ? 'active' : ''}
                                    onClick={() => {
                                        handleSidebar({
                                            isSubMenuOpen: true,
                                            activeMenuItem: module,
                                        })
                                    }}
                                    key={module}
                                >
                                    {module}
                                </li>
                            ))}
                        </ul>
                    ))}
                </div>
            }
            <div
                className={`${leftSidebarState.isOpen && leftSidebarState.isSubMenuOpen ? 'open' : ''} module-content`}
            >
                <div className='module-header'>
                    <span className='module-name'>{leftSidebarState.currModule}</span>
                    <div className='actions'>
                        <span
                            onClick={() => {
                                handleSidebar({ isSubMenuOpen: !leftSidebarState.isSubMenuOpen })
                            }}
                            className='btn'
                        >
                            <AiOutlineClose />
                        </span>
                    </div>
                </div>
                {leftSidebarState.isOpen && (
                    <div className='module-options'>
                        {leftSidebarState.currModule === 'add' && (
                            <DynamicModule
                                activeMenuItem={leftSidebarState.activeMenuItem}
                                addMenuItems={addMenuItems}
                            />
                        )}
                        {leftSidebarState.currModule === 'themes' && (
                            <div>
                                <button onClick={() => handleThemeChange('theme-1')}>Retro</button>
                                <button onClick={() => handleThemeChange('theme-2')}>Calming</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
