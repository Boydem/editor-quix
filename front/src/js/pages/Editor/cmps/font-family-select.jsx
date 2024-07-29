import * as Select from '@radix-ui/react-select'
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'

export function FontFamilySelect({ handleFontFamilyChange, SelectItem }) {
    return (
        <Select.Root onValueChange={handleFontFamilyChange}>
            <Select.Trigger className='SelectTrigger' aria-label='unit'>
                <Select.Value placeholder='Poppins' />
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
                            <SelectItem value='arial'>Arial</SelectItem>
                            <SelectItem value='roboto'>Roboto</SelectItem>
                            <SelectItem value='poppins'>Poppins</SelectItem>
                            <SelectItem value='Tahoma'>Tahoma</SelectItem>
                            <SelectItem value='verdana'>Verdana</SelectItem>
                            <SelectItem value='Trebuchet MS'>Trebuchet MS</SelectItem>
                            <SelectItem value='Times New Roman'>Times New Roman</SelectItem>
                            <SelectItem value='Georgia '>Georgia </SelectItem>
                            <SelectItem value='Courier New'>Courier New</SelectItem>
                            <SelectItem value='Brush Script MT'>Brush Script MT</SelectItem>
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
