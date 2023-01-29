import React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link, useParams } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg } from '../../../../services/event-bus.service'
import { saveWap } from '../../../../store/wap/wap.action'
export function SitesActionsDropdown({ isPublishing, setIsPublishing }) {
    // const [isRenaming, setIsRenaming] = useState()
    const navigate = useNavigate()
    const wap = useSelector(storeState => storeState.wapModule.wap)
    const user = useSelector(storeState => storeState.userModule.user)
    // const [wapNameToEdit, setWapNameToEdit] = useState({ title: '' })
    // function handleChange(ev) {
    //     const value = ev.target.value
    //     const field = ev.target.name
    //     setWapNameToEdit(prev => ({ ...prev, [field]: value }))
    // }
    const { wapId } = useParams()
    function navigatePreview() {
        if (!wap?.url) {
            navigate(`/preview/${wapId}`)
        } else {
            navigate(`/${wap?.url}`)
        }
    }
    function copyUrl() {
        navigator.clipboard.writeText(`http://localhost:3000/edit/${wapId}`)
        showSuccessMsg('Url copied to clipboard')
    }
    function renameSite() {}
    function onCreateNewSite() {
        showSuccessMsg('Your site has been saved. Ready for new site')
        navigate('/create')
    }

    function duplicateSite() {}
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button data-tooltip='Sites Actions' data-tooltip-dir={['bottom']} className='sites-actions-dropdown'>
                    <span>Sites</span>
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content className='DropdownMenuContent' sideOffset={5} align={'start'}>
                    <DropdownMenu.Item onClick={navigatePreview} className='DropdownMenuItem'>
                        Preview
                    </DropdownMenu.Item>
                    <DropdownMenu.Item onClick={() => setIsPublishing(true)} className='DropdownMenuItem'>
                        Publish
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator className='DropdownMenuSeparator' />
                    <DropdownMenu.Item onClick={copyUrl} className='DropdownMenuItem'>
                        Invite People to Collaborate
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator className='DropdownMenuSeparator' />
                    <DropdownMenu.Item className='DropdownMenuItem'>Rename Site</DropdownMenu.Item>
                    <DropdownMenu.Item onClick={onCreateNewSite} className='DropdownMenuItem'>
                        Create New Site
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className='DropdownMenuItem'>Duplicate Site</DropdownMenu.Item>
                    <DropdownMenu.Separator className='DropdownMenuSeparator' />
                    <DropdownMenu.Item className='DropdownMenuItem'>
                        <Link to={`/dashboard/${user?._id}`}>Dashboard</Link>
                    </DropdownMenu.Item>

                    <DropdownMenu.Arrow className='DropdownMenuArrow' />
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    )
}
