import { AiOutlineClose } from 'react-icons/ai'
import { Accordion } from './edit-accordion'
import { EditTabs } from './edit-tabs'

export function RightSidebar({ rightSidebarState, handleSidebarsChanges }) {
    function handleSidebar(stateChanges) {
        handleSidebarsChanges('right', stateChanges)
    }

    return (
        <div className={`right-sidebar ${rightSidebarState.isOpen ? 'open' : ''}`}>
            <div className='module-content'>
                <div className='module-header'>
                    <span className='module-name'>{rightSidebarState.context}</span>
                    <div className='actions'>
                        <span
                            onClick={() => {
                                handleSidebar({ isOpen: !rightSidebarState.isOpen })
                            }}
                            className='btn'
                        >
                            <AiOutlineClose />
                        </span>
                    </div>
                </div>
                {/* <AccordionEdit /> */}
                {/* <Accordion context={rightSidebarState.context} /> */}
                <EditTabs context={rightSidebarState.context} />
            </div>
        </div>
    )
}
