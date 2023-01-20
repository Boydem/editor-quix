import React from 'react'
import * as Select from '@radix-ui/react-select'
import classnames from 'classnames'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'

const SelectUnit = ({ onUnitChange }) => (
    <Select.Root onValueChange={onUnitChange}>
        <Select.Trigger className='SelectTrigger' aria-label='unit'>
            <Select.Value placeholder='px' />
        </Select.Trigger>
        <Select.Portal>
            <Select.Content position='popper' className='SelectContent'>
                <Select.ScrollUpButton className='SelectScrollButton'>
                    <ChevronUpIcon />
                </Select.ScrollUpButton>
                <Select.Viewport className='SelectViewport'>
                    <Select.Group>
                        <SelectItem value='px'>px</SelectItem>
                        <SelectItem value='pt'>pt</SelectItem>
                        <SelectItem value='em'>em</SelectItem>
                        <SelectItem value='rem'>rem</SelectItem>
                        <SelectItem value='%'>%</SelectItem>
                    </Select.Group>
                </Select.Viewport>
                <Select.ScrollDownButton className='SelectScrollButton'>
                    <ChevronDownIcon />
                </Select.ScrollDownButton>
            </Select.Content>
        </Select.Portal>
    </Select.Root>
)

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

export default SelectUnit
