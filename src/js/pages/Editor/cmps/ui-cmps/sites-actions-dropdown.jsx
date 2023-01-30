import React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link, useParams } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg } from '../../../../services/event-bus.service'
import { saveWap } from '../../../../store/wap/wap.action'
export function SitesActionsDropdown({ onPublish, onDuplicateWap, setIsRenaming, onPreview, onInvite }) {
    const navigate = useNavigate()
    const user = useSelector(storeState => storeState.userModule.user)

    function renameSite() {
        setIsRenaming(true)
        onPublish()
    }
    function onCreateNewSite() {
        showSuccessMsg('Your site has been saved. Ready for new site')
        navigate('/create')
    }

    function onDashboard() {
        if (user) {
            navigate(`/dashboard/${user?._id}`)
        } else {
            showErrorMsg('You must sign in first!')
        }
    }

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button data-tooltip='Sites Actions' data-tooltip-dir={['bottom']} className='sites-actions-dropdown'>
                    <span>Sites</span>
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content className='DropdownMenuContent' sideOffset={5} align={'start'}>
                    <DropdownMenu.Item onClick={onPreview} className='DropdownMenuItem'>
                        Preview
                    </DropdownMenu.Item>
                    <DropdownMenu.Item onClick={onPublish} className='DropdownMenuItem'>
                        Publish
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator className='DropdownMenuSeparator' />
                    <DropdownMenu.Item onClick={onInvite} className='DropdownMenuItem'>
                        Invite People to Collaborate
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator className='DropdownMenuSeparator' />
                    <DropdownMenu.Item className='DropdownMenuItem' onClick={renameSite}>
                        Rename Site
                    </DropdownMenu.Item>
                    <DropdownMenu.Item onClick={onCreateNewSite} className='DropdownMenuItem'>
                        Create New Site
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className='DropdownMenuItem' onClick={onDuplicateWap}>
                        Duplicate Site
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator className='DropdownMenuSeparator' />
                    <DropdownMenu.Item className='DropdownMenuItem' onClick={onDashboard}>
                        Dashboard
                    </DropdownMenu.Item>

                    <DropdownMenu.Arrow className='DropdownMenuArrow' />
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    )
}
