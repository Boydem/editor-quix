import React from 'react'
import * as Select from '@radix-ui/react-select'
import classnames from 'classnames'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'

const SelectUnit = ({ onUnitChange, unit, unitOpts, placeholder }) => (
    <Select.Root onValueChange={onUnitChange} value={unit}>
        <Select.Trigger className='SelectTrigger' aria-label='unit'>
            <Select.Value placeholder={placeholder} />
            <Select.Icon className='SelectIcon'>
                <ChevronDownIcon />
            </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
            <Select.Content position='popper' className='SelectContent'>
                <Select.ScrollUpButton className='SelectScrollButton'>
                    <ChevronUpIcon />
                </Select.ScrollUpButton>
                <Select.Viewport className='SelectViewport'>
                    <Select.Group>
                        {unitOpts.map(opt => (
                            <SelectItem key={opt} value={opt}>
                                {opt}
                            </SelectItem>
                        ))}
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
