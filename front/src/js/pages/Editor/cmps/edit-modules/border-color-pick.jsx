import { BlockPicker } from 'react-color'

export function BorderColorPick({ openBorderColorPalette, elClickedNode, isBorderPaletteOpen, handleColorChange }) {
    return (
        <div className='color-pick adjust-inputs'>
            <label onClick={openBorderColorPalette}>Border Color</label>
            <div
                onClick={openBorderColorPalette}
                style={{
                    backgroundColor: `${
                        elClickedNode && window.getComputedStyle(elClickedNode).getPropertyValue('border-color')
                    }`,
                }}
                className='curr-color'
            ></div>
            <BlockPicker
                className={`${isBorderPaletteOpen ? 'open' : ''} palette`}
                onChange={handleColorChange}
                triangle={'hide'}
                color={
                    (elClickedNode && window.getComputedStyle(elClickedNode).getPropertyValue('border-color')) || '#000'
                }
            />
        </div>
    )
}
