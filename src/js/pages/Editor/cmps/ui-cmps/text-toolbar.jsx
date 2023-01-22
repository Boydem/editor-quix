import * as Toolbar from '@radix-ui/react-toolbar'
import {
    UnderlineIcon,
    TextAlignLeftIcon,
    TextAlignCenterIcon,
    TextAlignRightIcon,
    FontBoldIcon,
    FontItalicIcon,
} from '@radix-ui/react-icons'

export function TextToolbar({ elClickedNode, handleTextStyleChange }) {
    const fontWeight =
        (elClickedNode && window.getComputedStyle(elClickedNode).getPropertyValue('font-weight')) || '400'
    const isBold = fontWeight > 400 ? 'on' : 'off'
    const isUnderline = elClickedNode && elClickedNode.style.textDecorationStyle
    const textAlign = elClickedNode && elClickedNode.style.textAlign
    const isItalic = elClickedNode && elClickedNode.style.fontStyle

    return (
        <Toolbar.Root className='adjust-inputs' aria-label='Formatting options'>
            <Toolbar.ToggleGroup type='multiple' aria-label='Text formatting'>
                <Toolbar.ToggleItem
                    onClick={() => handleTextStyleChange('fontWeight', 'bold')}
                    className='ToolbarToggleItem'
                    value='bold'
                    aria-label='Bold'
                    data-state={isBold}
                >
                    <FontBoldIcon />
                </Toolbar.ToggleItem>
                <Toolbar.ToggleItem
                    onClick={() => handleTextStyleChange('fontStyle', 'italic')}
                    className='ToolbarToggleItem'
                    value='italic'
                    aria-label='Italic'
                    data-state={isItalic === 'italic' ? 'on' : 'off'}
                >
                    <FontItalicIcon />
                </Toolbar.ToggleItem>
                <Toolbar.ToggleItem
                    onClick={() => handleTextStyleChange('textDecoration', 'underline')}
                    className='ToolbarToggleItem'
                    value='strikethrough'
                    aria-label='Strike through'
                    data-state={isUnderline === 'initial' ? 'on' : 'off'}
                >
                    <UnderlineIcon />
                </Toolbar.ToggleItem>
            </Toolbar.ToggleGroup>
            <Toolbar.ToggleGroup type='single' defaultValue='center' aria-label='Text alignment'>
                <Toolbar.ToggleItem
                    onClick={() => handleTextStyleChange('textAlign', 'start')}
                    className='ToolbarToggleItem'
                    value='left'
                    aria-label='Left aligned'
                    data-state={textAlign === 'start' ? 'on' : 'off'}
                >
                    <TextAlignLeftIcon />
                </Toolbar.ToggleItem>
                <Toolbar.ToggleItem
                    onClick={() => handleTextStyleChange('textAlign', 'center')}
                    className='ToolbarToggleItem'
                    value='center'
                    aria-label='Center aligned'
                    data-state={textAlign === 'center' ? 'on' : 'off'}
                >
                    <TextAlignCenterIcon />
                </Toolbar.ToggleItem>
                <Toolbar.ToggleItem
                    onClick={() => handleTextStyleChange('textAlign', 'end')}
                    className='ToolbarToggleItem'
                    value='right'
                    aria-label='Right aligned'
                    data-state={textAlign === 'end' ? 'on' : 'off'}
                >
                    <TextAlignRightIcon />
                </Toolbar.ToggleItem>
            </Toolbar.ToggleGroup>
        </Toolbar.Root>
    )
}
