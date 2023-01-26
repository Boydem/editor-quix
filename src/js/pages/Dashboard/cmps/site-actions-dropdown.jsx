import React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { DotFilledIcon, CheckIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { BsThreeDots } from 'react-icons/bs'

export function SiteActionsDropdown() {
    const [bookmarksChecked, setBookmarksChecked] = React.useState(true)
    const [urlsChecked, setUrlsChecked] = React.useState(false)
    const [person, setPerson] = React.useState('pedro')

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button
                    data-tooltip='Site Actions'
                    data-tooltip-dir={['left', 'info']}
                    className='site-actions-dropdown'
                >
                    <BsThreeDots />
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content className='DropdownMenuContent' sideOffset={5} align={'end'}>
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
