import { DynamicModule } from './dynamic-module'
import { AiOutlineClose } from 'react-icons/ai'

export function LeftSidebar({ leftSidebarState, handleSidebarsChanges }) {
    const addMenuItems = [
        ['Quick add', 'Assets'],
        ['Header', 'Hero', 'Section', 'Card', 'Footer', 'Media', 'Decorative', 'Contact & Forms', 'Embed & Social'],
        ['Cards', 'Galleries', 'Members', 'Section'],
    ]

    function handleSidebar(sidebarChanges) {
        handleSidebarsChanges('left', sidebarChanges)
    }

    return (
        <div className={`left-sidebar ${leftSidebarState.isOpen ? 'open' : ''}`}>
            <div className='module-menu'>
                <div className='indicator'>+</div>
                {addMenuItems.map((menuItem, idx) => (
                    <ul key={idx} className='menu-items'>
                        {menuItem.map(module => (
                            <li
                                className={leftSidebarState.currModule === module ? 'active' : ''}
                                onClick={() => {
                                    handleSidebar({
                                        currModule: module,
                                        isSubMenuOpen: true,
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
            <div className={`${leftSidebarState.isSubMenuOpen ? 'open' : ''} module-content`}>
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
                <div className='module-options'>
                    <DynamicModule currModule={leftSidebarState.currModule} addMenuItems={addMenuItems} />
                </div>
            </div>
        </div>
    )
}
