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
    let cmpTitle = ''

    switch (rightSidebarState.context) {
        case 'div':
            cmpTitle = 'Container'
            break
        case 'p':
        case 'span':
            cmpTitle = 'Text'
            break
        case 'button':
            cmpTitle = 'Button'
            break
        case 'img':
            cmpTitle = 'Image'
            break
        case 'a':
            cmpTitle = 'Link'
            break
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'h6':
            cmpTitle = 'Title'
            break

        case 'input':
            cmpTitle = 'Input'
            break
        case 'label':
            cmpTitle = 'Label'
            break
        case 'form':
            cmpTitle = 'Form'
            break
        case 'social':
            cmpTitle = 'Social'
            break
        case 'video':
            cmpTitle = 'Video'
            break
        case 'subscribe':
            cmpTitle = 'Subscribe'
            break

        case 'map':
            cmpTitle = 'Map'
            break
        case 'chat':
            cmpTitle = 'Chat'
            break
        default:
    }

    function handleSidebar(stateChanges) {
        handleSidebarsChanges('right', stateChanges)
    }

    return (
        <div className={`right-sidebar ${rightSidebarState.isOpen ? 'open' : ''}`}>
            {!elClickedNode && <EmptyRightSidebar />}

            {elClickedNode && (
                <div className='module-content'>
                    <div className='module-header'>
                        <span className='module-name'>{cmpTitle}</span>
                        <div className='actions flex align-center'>
                            <DeleteAlertDialog />

                            <span
                                onClick={() => {
                                    handleSidebar({ isOpen: !rightSidebarState.isOpen })
                                }}
                                className='tab'
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
