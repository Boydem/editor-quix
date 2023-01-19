import { DynamicModule } from './dynamic-module'
import { AiOutlineClose } from 'react-icons/ai'
import { useState } from 'react'

export function AddModules({ setSidebarOpen, setActiveModule, activeModule, addModulesMenuItems }) {
    const [isModuleOpen, setIsModuleOpen] = useState(null)
    return (
        <div className='add-modules'>
            <div className='modules'>
                {addModulesMenuItems.map((moduleGroup, idx) => (
                    <ul key={idx} className='modules-list'>
                        {moduleGroup.map((module, idx) => (
                            <li
                                className={activeModule === module ? 'active' : ''}
                                onClick={() => {
                                    setIsModuleOpen(true)
                                    setActiveModule(module)
                                }}
                                key={idx}
                            >
                                {module}
                            </li>
                        ))}
                    </ul>
                ))}
            </div>
            <div className={`${isModuleOpen ? 'open' : ''} module-content`}>
                <div className='module-header'>
                    <span className='module-name'>{activeModule}</span>
                    <div className='actions'>
                        <span
                            onClick={() => {
                                setIsModuleOpen(prev => !prev)
                                setActiveModule(null)
                                // setTimeout(() => setSidebarOpen(prev => !prev), 300)
                            }}
                            className='btn'
                        >
                            <AiOutlineClose />
                        </span>
                    </div>
                </div>
                <div className='module-options'>
                    <DynamicModule activeModule={activeModule} addModulesMenuItems={addModulesMenuItems} />
                </div>
            </div>
        </div>
    )
}
