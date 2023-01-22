import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

import { Accordion } from './edit-accordion'
import { EmptyRightSidebar } from './edit-modules/empty-right-sidebar'
import { EditTabs } from './edit-tabs'
import { removeCmp } from '../../../store/wap/wap.action'
import { showErrorMsg } from '../../../services/event-bus.service'
import { DeleteAlertDialog } from './ui-cmps/alert-dialog'

export function RightSidebar({ rightSidebarState, handleSidebarsChanges }) {
    const elClickedNode = useSelector(storeState => storeState.wapModule.elClickedNode)

    function handleSidebar(stateChanges) {
        handleSidebarsChanges('right', stateChanges)
    }

    return (
        <div className={`right-sidebar ${rightSidebarState.isOpen ? 'open' : ''}`}>
            {!elClickedNode && <EmptyRightSidebar />}

            {elClickedNode && (
                <div className='module-content'>
                    <div className='module-header'>
                        <span className='module-name'>{rightSidebarState.context}</span>
                        <div className='actions flex align-center'>
                            <DeleteAlertDialog />

                            <span
                                onClick={() => {
                                    handleSidebar({ isOpen: !rightSidebarState.isOpen })
                                }}
                                className='tool'
                            >
                                <AiOutlineClose />
                            </span>
                        </div>
                    </div>
                    <EditTabs context={rightSidebarState.context} />
                </div>
            )}
        </div>
    )
}
