import { AiOutlineClose } from 'react-icons/ai'

export function EditModules({ setSidebarOpen, setActiveModule, activeModule }) {
    return (
        <div className='edit-modules'>
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
            </div>
        </div>
    )
}
