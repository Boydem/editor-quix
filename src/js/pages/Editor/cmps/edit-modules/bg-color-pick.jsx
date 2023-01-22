import { BlockPicker } from 'react-color'

export function BgColorPick({ openBgColorPalette, elClickedNode, isBgPaletteOpen, handleColorChange }) {
    return (
        <div className='color-pick adjust-inputs'>
            <label onClick={openBgColorPalette}>Background Color</label>
            <div
                onClick={openBgColorPalette}
                style={{
                    backgroundColor: `${
                        elClickedNode && window.getComputedStyle(elClickedNode).getPropertyValue('background-color')
                    }`,
                }}
                className='curr-color'
            ></div>
            <BlockPicker
                className={`${isBgPaletteOpen ? 'open' : ''} palette`}
                onChange={handleColorChange}
                triangle={'hide'}
                color={
                    (elClickedNode && window.getComputedStyle(elClickedNode).getPropertyValue('background-color')) ||
                    '#000'
                }
            />
        </div>
    )
}
