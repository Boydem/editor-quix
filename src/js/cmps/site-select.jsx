import React from 'react'
import * as Select from '@radix-ui/react-select'
import classnames from 'classnames'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'

export function SiteSelect({ userData, onSiteChange, currSite }) {
    if (!userData) return <div>No sites</div>
    return (
        <section className='site-select'>
            <Select.Root onValueChange={onSiteChange} value={currSite}>
                <Select.Trigger className='SelectTrigger' aria-label='unit'>
                    <Select.Value />
                </Select.Trigger>
                <Select.Portal>
                    <Select.Content position='popper' className='SelectContent'>
                        <Select.ScrollUpButton className='SelectScrollButton'>
                            <ChevronUpIcon />
                        </Select.ScrollUpButton>
                        <Select.Viewport className='SelectViewport'>
                            <Select.Group>
                                {userData?.sites.length > 1 ? (
                                    userData.sites.map(site => (
                                        <SelectItem key={site._id} value={site._id}>
                                            {site.title}
                                        </SelectItem>
                                    ))
                                ) : (
                                    <SelectItem value={userData.sites[0]._id}>{userData.sites[0].title}</SelectItem>
                                )}
                            </Select.Group>
                        </Select.Viewport>
                        <Select.ScrollDownButton className='SelectScrollButton'>
                            <ChevronDownIcon />
                        </Select.ScrollDownButton>
                    </Select.Content>
                </Select.Portal>
            </Select.Root>
        </section>
    )
}
const SelectItem = React.forwardRef(({ children, className, ...props }, forwardedRef) => {
    return (
        <Select.Item className={classnames('SelectItem', className)} {...props} ref={forwardedRef}>
            <Select.ItemText>{children}</Select.ItemText>
            <Select.ItemIndicator className='SelectItemIndicator'>
                <CheckIcon />
            </Select.ItemIndicator>
        </Select.Item>
    )
})
