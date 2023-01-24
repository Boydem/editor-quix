import { DynamicModule } from './dynamic-module'
import { AiOutlineClose } from 'react-icons/ai'
import { saveCmp } from '../../../store/wap/wap.action'
import { useEffect, useRef, useState } from 'react'
import { wapService } from '../../../services/wap.service'
import { AiOutlinePlus } from 'react-icons/ai'
export function LeftSidebar({ leftSidebarState, handleSidebarsChanges, wap }) {
    // const [theme, setTheme] = useState('')
    const theme = useRef()
    const addMenuItems = [
        ['Header', 'Hero', 'Section', 'Card', 'Form', 'Chat', 'Footer', 'Contact & Forms', 'Social', 'Galleries'],
    ]

    function handleSidebar(sidebarChanges) {
        handleSidebarsChanges('left', sidebarChanges)
    }
    useEffect(() => {
        setThemeClass()

        return () => {
            const root = document.getElementById('root')
            root.classList.remove(theme.current)
            theme.current = null
        }
    }, [])

    function setThemeClass() {
        const root = document.getElementById('root')
        theme.current = wap.themeClass
        root.classList.add(wap.themeClass)
    }

    function handleThemeChange(selectedTheme) {
        const root = document.getElementById('root')
        root.classList.replace(theme.current, selectedTheme)
        theme.current = selectedTheme
        wap.themeClass = selectedTheme
        wapService.save(wap)
    }

    return (
        <div
            className={`left-sidebar ${leftSidebarState.isOpen ? 'open' : ''} ${leftSidebarState.currModule} ${
                leftSidebarState.isDragging ? 'dragging' : ''
            }`}
        >
            {
                <div className={`${leftSidebarState.currModule} module-menu`}>
                    <div
                        data-tooltip={!leftSidebarState.isOpen ? 'add' : ''}
                        data-tooltip-dir={['right', 'no-fading']}
                        onClick={() =>
                            handleSidebar({
                                isOpen: !leftSidebarState.isOpen,
                                isSubMenuOpen: false,
                                activeMenuItem: 'Quick add',
                                currModule: leftSidebarState.currModule !== 'add' ? 'add' : null,
                            })
                        }
                        className='indicator'
                    ></div>
                    {addMenuItems.map((menuItems, idx) => (
                        <ul key={idx} className='menu-items'>
                            {menuItems.map(menuItem => (
                                <li
                                    className={leftSidebarState.activeMenuItem === menuItem ? 'active' : ''}
                                    onClick={() => {
                                        handleSidebar({
                                            isOpen: true,
                                            isSubMenuOpen: true,
                                            activeMenuItem: menuItem,
                                        })
                                    }}
                                    key={menuItem}
                                >
                                    {menuItem}
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
                    <span className='module-name'>
                        {leftSidebarState.currModule === 'add'
                            ? leftSidebarState.activeMenuItem
                            : leftSidebarState.currModule}
                    </span>
                    <div className='actions'>
                        <span
                            onClick={() => {
                                handleSidebar({ isSubMenuOpen: false })
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
                                <div className='theme-container' onClick={() => handleThemeChange('theme-1')}>
                                    <div className='theme-header'>
                                        <p className='theme-title'>Buisness</p>
                                        <p className='theme-desc'>Modern & efficient</p>
                                    </div>
                                    <div className='theme-colors-container'>
                                        <div style={{ backgroundColor: '#4c80fb', height: '15px' }}></div>
                                        <div style={{ backgroundColor: '#556a87', height: '15px' }}></div>
                                        <div style={{ backgroundColor: '#101010', height: '15px' }}></div>
                                        <div style={{ backgroundColor: '#f4f4f6', height: '15px' }}></div>
                                    </div>
                                </div>
                                <div className='theme-container' onClick={() => handleThemeChange('theme-2')}>
                                    <div className='theme-header'>
                                        <p className='theme-title'>Creamy</p>
                                        <p className='theme-desc'>Netural & serene</p>
                                    </div>
                                    <div className='theme-colors-container'>
                                        <div style={{ backgroundColor: '#055345', height: '15px' }}></div>
                                        <div style={{ backgroundColor: '#f3ceac', height: '15px' }}></div>
                                        <div style={{ backgroundColor: '#f9efe6', height: '15px' }}></div>
                                        <div style={{ backgroundColor: '#101010', height: '15px' }}></div>
                                    </div>
                                </div>
                                <div className='theme-container' onClick={() => handleThemeChange('theme-3')}>
                                    <div className='theme-header'>
                                        <p className='theme-title'>Mature</p>
                                        <p className='theme-desc'>Subtle & refined</p>
                                    </div>
                                    <div className='theme-colors-container'>
                                        <div style={{ backgroundColor: '#3d405b', height: '15px' }}></div>
                                        <div style={{ backgroundColor: '#e07a5f', height: '15px' }}></div>
                                        <div style={{ backgroundColor: '#f4f1de', height: '15px' }}></div>
                                        <div style={{ backgroundColor: '#66c697', height: '15px' }}></div>
                                    </div>
                                </div>
                                <div className='theme-container' onClick={() => handleThemeChange('theme-4')}>
                                    <div className='theme-header'>
                                        <p className='theme-title'>Laid-back</p>
                                        <p className='theme-desc'>Mellow & easygoing</p>
                                    </div>
                                    <div className='theme-colors-container'>
                                        <div style={{ backgroundColor: '#a0a0a0', height: '15px' }}></div>
                                        <div style={{ backgroundColor: '#ffcdb2', height: '15px' }}></div>
                                        <div style={{ backgroundColor: '#101010', height: '15px' }}></div>
                                        <div style={{ backgroundColor: '#a17171', height: '15px' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
