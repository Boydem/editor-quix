import { useState } from 'react'
import { DynamicModule } from './dynamic-module'
import { AiOutlineClose } from 'react-icons/ai'

export function AddSidebar({ setIsAdding }) {
    const [activeModule, setActiveModule] = useState('Quick add')
    const modulesMenuItems = [
        ['Quick add', 'Assets'],
        [
            'Compositions',
            'Layout tools',
            'Button',
            'Text',
            'Menu & Search',
            'Media',
            'Decorative',
            'Contact & Forms',
            'Embed & Social',
        ],
        ['Cards', 'Galleries', 'Members', 'Section'],
    ]

    return (
        <section className='add-side-bar'>
            <div className='modules'>
                {modulesMenuItems.map((moduleGroup, idx) => (
                    <ul key={idx} className='modules-list'>
                        {moduleGroup.map((module, idx) => (
                            <li key={idx}>{module}</li>
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
                                setIsAdding(prev => !prev)
                            }}
                            className='btn'
                        >
                            <AiOutlineClose />
                        </span>
                    </div>
                </div>
                <div className='module-options'>
                    <DynamicModule activeModule={activeModule} />
                </div>
            </div>
        </section>
    )
}
