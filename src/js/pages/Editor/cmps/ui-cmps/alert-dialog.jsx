import React from 'react'
import { useSelector } from 'react-redux'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { removeCmp } from '../../../../store/wap/wap.action'
import { showErrorMsg, showSuccessMsg } from '../../../../services/event-bus.service'
import { FiTrash } from 'react-icons/fi'

export function DeleteAlertDialog() {
    const clickedCmp = useSelector(storeState => storeState.wapModule.clickedCmp)
    const [open, setOpen] = React.useState(false)

    async function onRemoveCmp(userAns) {
        if (!userAns) {
            setOpen(false)
            showErrorMsg('Failed Removing Component')
        } else {
            removeCmp(clickedCmp)
            showSuccessMsg('Component removed')
        }
    }

    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger asChild>
                <button
                    onClick={() => setOpen(prev => !prev)}
                    className='btn-icon small alert'
                    data-tooltip='Trash'
                    data-tooltip-dir='left'
                >
                    <FiTrash />
                </button>
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
                <AlertDialog.Overlay className='AlertDialogOverlay' />
                <AlertDialog.Content className='AlertDialogContent'>
                    <AlertDialog.Title className='AlertDialogTitle'>
                        Are you sure you want to remove this element?
                    </AlertDialog.Title>
                    <AlertDialog.Description className='AlertDialogDescription mt-1'>
                        NOTE: The action will be stored in session history untill you leave the session.
                    </AlertDialog.Description>
                    <div style={{ display: 'flex', gap: 25, justifyContent: 'flex-end' }}>
                        <AlertDialog.Cancel asChild>
                            <button onClick={() => onRemoveCmp(false)} className='Button mauve'>
                                Cancel
                            </button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action asChild>
                            <button onClick={() => onRemoveCmp(true)} className='Button red'>
                                Delete
                            </button>
                        </AlertDialog.Action>
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    )
}
