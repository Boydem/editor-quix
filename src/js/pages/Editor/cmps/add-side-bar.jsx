import { useState } from 'react'
import { DynamicModule } from './dynamic-module'

export function AddSidebar() {
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
                <div className='module-header flex'>
                    <h5>{activeModule}</h5>
                    <div className='actions'>
                        <button>X</button>
                    </div>
                </div>
                <DynamicModule activeModule={activeModule} />
            </div>
        </section>
    )
}
