import React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { DotFilledIcon, CheckIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { BsThreeDots } from 'react-icons/bs'

export function SitesActionsDropdown() {
    const [bookmarksChecked, setBookmarksChecked] = React.useState(true)
    const [urlsChecked, setUrlsChecked] = React.useState(false)
    const [person, setPerson] = React.useState('pedro')

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button data-tooltip='Sites Actions' data-tooltip-dir={['bottom']} className='sites-actions-dropdown'>
                    <span>Sites</span>
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content className='DropdownMenuContent' sideOffset={5} align={'start'}>
                    <DropdownMenu.Item className='DropdownMenuItem'>Preview</DropdownMenu.Item>
                    <DropdownMenu.Item className='DropdownMenuItem'>Publish</DropdownMenu.Item>
                    <DropdownMenu.Separator className='DropdownMenuSeparator' />
                    <DropdownMenu.Item className='DropdownMenuItem'>Invite People to Collaborate</DropdownMenu.Item>
                    <DropdownMenu.Separator className='DropdownMenuSeparator' />
                    <DropdownMenu.Item className='DropdownMenuItem'>Rename Site</DropdownMenu.Item>
                    <DropdownMenu.Item className='DropdownMenuItem'>Create New Site</DropdownMenu.Item>
                    <DropdownMenu.Item className='DropdownMenuItem'>Duplicate Site</DropdownMenu.Item>
                    <DropdownMenu.Separator className='DropdownMenuSeparator' />
                    <DropdownMenu.Item className='DropdownMenuItem'>Dashboard</DropdownMenu.Item>

                    <DropdownMenu.Arrow className='DropdownMenuArrow' />
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    )
}
