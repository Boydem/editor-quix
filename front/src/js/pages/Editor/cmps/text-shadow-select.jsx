import * as Select from '@radix-ui/react-select'
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'

export function TextShadowSelectInput({ handleTextShadowChange, SelectItem }) {
    return (
        <Select.Root onValueChange={handleTextShadowChange}>
            <Select.Trigger className='SelectTrigger' aria-label='unit'>
                <Select.Value placeholder='None' />
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
                            <SelectItem value='0'>None</SelectItem>
                            <SelectItem value='.1'>Light</SelectItem>
                            <SelectItem value='.3'>Medium</SelectItem>
                            <SelectItem value='.5'>Strong</SelectItem>
                        </Select.Group>
                    </Select.Viewport>

                    <Select.ScrollDownButton className='SelectScrollButton'>
                        <ChevronDownIcon />
                    </Select.ScrollDownButton>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    )
}
