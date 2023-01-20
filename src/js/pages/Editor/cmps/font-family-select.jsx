import * as Select from '@radix-ui/react-select'
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'

export function FontFamilySelect({ handleFontFamilyChange, SelectItem }) {
    return (
        <Select.Root onValueChange={handleFontFamilyChange}>
            <Select.Trigger className='SelectTrigger' aria-label='unit'>
                <Select.Value placeholder='Poppins' />
            </Select.Trigger>
            <Select.Portal>
                <Select.Content position='popper' className='SelectContent'>
                    <Select.ScrollUpButton className='SelectScrollButton'>
                        <ChevronUpIcon />
                    </Select.ScrollUpButton>
                    <Select.Viewport className='SelectViewport'>
                        <Select.Group>
                            <SelectItem value='arial'>Arial</SelectItem>
                            <SelectItem value='roboto'>Roboto</SelectItem>
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
