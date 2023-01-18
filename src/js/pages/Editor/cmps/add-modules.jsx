import { DynamicModule } from './dynamic-module'
import { AiOutlineClose } from 'react-icons/ai'

export function AddModules({ setSidebarOpen, setActiveModule, activeModule, addModulesMenuItems }) {
    return (
        <div className='add-modules'>
            <div className='modules'>
                {addModulesMenuItems.map((moduleGroup, idx) => (
                    <ul key={idx} className='modules-list'>
                        {moduleGroup.map((module, idx) => (
                            <li
                                className={activeModule === module ? 'active' : ''}
                                onClick={() => setActiveModule(module)}
                                key={idx}
                            >
                                {module}
                            </li>
                        ))}
                    </ul>
                ))}
            </div>
            <div className='module-content'>
                <div className='module-header'>
                    <span className='module-name'>{activeModule}</span>
                    <div className='actions'>
                        <span
                            onClick={() => {
                                setSidebarOpen(prev => !prev)
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
