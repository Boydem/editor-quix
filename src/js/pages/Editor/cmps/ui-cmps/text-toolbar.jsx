import * as Toolbar from '@radix-ui/react-toolbar'
import {
    UnderlineIcon,
    TextAlignLeftIcon,
    TextAlignCenterIcon,
    TextAlignRightIcon,
    FontBoldIcon,
    FontItalicIcon,
} from '@radix-ui/react-icons'

export function TextToolbar({ handleTextStyleChange }) {
    return (
        <Toolbar.Root className='ToolbarRoot' aria-label='Formatting options'>
            <Toolbar.ToggleGroup type='multiple' aria-label='Text formatting'>
                <Toolbar.ToggleItem
                    onClick={() => handleTextStyleChange('fontWeight', 'bold')}
                    className='ToolbarToggleItem'
                    value='bold'
                    aria-label='Bold'
                >
                    <FontBoldIcon />
                </Toolbar.ToggleItem>
                <Toolbar.ToggleItem
                    onClick={() => handleTextStyleChange('fontStyle', 'italic')}
                    className='ToolbarToggleItem'
                    value='italic'
                    aria-label='Italic'
                >
                    <FontItalicIcon />
                </Toolbar.ToggleItem>
                <Toolbar.ToggleItem
                    onClick={() => handleTextStyleChange('textDecoration', 'underline')}
                    className='ToolbarToggleItem'
                    value='strikethrough'
                    aria-label='Strike through'
                >
                    <UnderlineIcon />
                </Toolbar.ToggleItem>
            </Toolbar.ToggleGroup>
            <Toolbar.Separator className='ToolbarSeparator' />
            <Toolbar.ToggleGroup type='single' defaultValue='center' aria-label='Text alignment'>
                <Toolbar.ToggleItem
                    onClick={() => handleTextStyleChange('textAlign', 'start')}
                    className='ToolbarToggleItem'
                    value='left'
                    aria-label='Left aligned'
                >
                    <TextAlignLeftIcon />
                </Toolbar.ToggleItem>
                <Toolbar.ToggleItem
                    onClick={() => handleTextStyleChange('textAlign', 'center')}
                    className='ToolbarToggleItem'
                    value='center'
                    aria-label='Center aligned'
                >
                    <TextAlignCenterIcon />
                </Toolbar.ToggleItem>
                <Toolbar.ToggleItem
                    onClick={() => handleTextStyleChange('textAlign', 'end')}
                    className='ToolbarToggleItem'
                    value='right'
                    aria-label='Right aligned'
                >
                    <TextAlignRightIcon />
                </Toolbar.ToggleItem>
            </Toolbar.ToggleGroup>
        </Toolbar.Root>
    )
}
