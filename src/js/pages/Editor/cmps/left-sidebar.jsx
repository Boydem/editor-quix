import { DynamicModule } from './dynamic-module'
import { AiOutlineClose } from 'react-icons/ai'
import { saveCmp } from '../../../store/wap/wap.action'
import { useEffect, useRef, useState } from 'react'
import { wapService } from '../../../services/wap.service'

import { AiOutlinePlus } from 'react-icons/ai'
import { FiLayers } from 'react-icons/fi'
import { IoColorFilterOutline } from 'react-icons/io5'

export function LeftSidebar({ leftSidebarState, handleSidebarsChanges, wap }) {
    // const [theme, setTheme] = useState('')
    const theme = useRef()
    let currActive = useRef('Header')
    const menuItems = [
        ['Header', 'Hero', 'Section', 'Card', 'Form', 'Chat', 'Footer', 'Contact & Forms', 'Social', 'Galleries'],
        ['Themes'],
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
    console.log('leftSidebarState:', leftSidebarState)
    return (
        <div
            className={`left-sidebar ${leftSidebarState.isOpen ? 'open' : ''} ${
                leftSidebarState.isDragging ? 'dragging' : ''
            }`}
        >
            {
                <div className={`module-menu`}>
                    {/* <div className='tabs flex'>
                        {tabs.map((tab, idx) => (
                            <button
                                data-tabtip={`${tab}`}
                                data-tabtip-dir='bottom'
                                key={idx}
                                onClick={() =>
                                    onTabClick('left', {
                                        isOpen: true,
                                        currModule: tab,
                                        activeMenuItem: null,
                                        isSubMenuOpen: tab === 'add' ? false : true,
                                    })
                                }
                                className={`${leftSidebarState.currModule === tab ? 'active' : ''} tab`}
                            >
                                {tab === 'add' && <AiOutlinePlus />}
                                {tab === 'themes' && <IoColorFilterOutline />}
                            </button>
                        ))}
                    </div> */}
                </div>
            }
            <div
                className={`${leftSidebarState.isOpen && leftSidebarState.isSubMenuOpen ? 'open' : ''} module-content`}
            >
                <div className='module-header'>
                    <span className='module-name'>{leftSidebarState.activeMenuItem}</span>
                    <div className='actions'>
                        <span
                            onClick={() => {
                                handleSidebar({ isSubMenuOpen: false })
                            }}
                            className='tab'
                        >
                            <AiOutlineClose />
                        </span>
                    </div>
                </div>

                {leftSidebarState.isOpen && (
                    <div className='module-options'>
                        {leftSidebarState.activeMenuItem === 'themes' && (
                            <div>
                                <div className='theme-container' onClick={() => handleThemeChange('theme-1')}>
                                    <div className='theme-header'>
                                        <h5>Buisness</h5>
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
                                        <h5>Creamy</h5>
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
                                        <h5>Mature</h5>
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
                                        <h5>Laid-back</h5>
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
                        <DynamicModule activeMenuItem={leftSidebarState.activeMenuItem} addMenuItems={menuItems} />
                    </div>
                )}
            </div>
        </div>
    )
}
