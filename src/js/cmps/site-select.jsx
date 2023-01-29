import React from 'react'
import * as Select from '@radix-ui/react-select'
import classnames from 'classnames'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import { Loader } from './loader'

export function SiteSelect({ sites, onSiteChange, currSite }) {
    if (!sites) return <Loader />
    return (
        <section className='site-select'>
            <Select.Root onValueChange={onSiteChange} value={currSite}>
                <Select.Trigger className='SelectTrigger open-style-select' aria-label='unit'>
                    <Select.Value placeholder='Select Site' />
                    <Select.Icon className='SelectIcon'>
                        <ChevronDownIcon />
                    </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                    <Select.Content sideOffset={0} position='popper' className='SelectContent open-style-select'>
                        <Select.ScrollUpButton className='SelectScrollButton'>
                            <ChevronUpIcon />
                        </Select.ScrollUpButton>
                        <Select.Viewport className='SelectViewport open-style-select'>
                            <Select.Group>
                                {sites.length > 1 ? (
                                    sites.map(site => (
                                        <SelectItem
                                            className='open-style-select SelectItem'
                                            key={site._id}
                                            value={site._id}
                                        >
                                            {site.title}
                                        </SelectItem>
                                    ))
                                ) : (
                                    <SelectItem value={sites[0]._id}>{sites[0].title}</SelectItem>
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
