import { useEffect } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { Accordion } from './edit-accordion'
import { EmptyRightSidebar } from './edit-modules/empty-right-sidebar'
import { EditTabs } from './edit-tabs'

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
        case 'video':
            cmpTitle = 'Video'
            break

        case 'map':
            cmpTitle = 'Map'
            break
        case 'chat':
            cmpTitle = 'Chat'
            break
        default:
            console.log('Went to default in right side bar')
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
                    <EditTabs context={rightSidebarState.context} />
                </div>
            )}
        </div>
    )
}
