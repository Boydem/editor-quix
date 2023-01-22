import { BlockPicker } from 'react-color'

export default function TextColorPick({ openTextColorPalette, elClickedNode, isTextPaletteOpen, handleColorChange }) {
    return (
        <div className='color-pick adjust-inputs'>
            <label onClick={openTextColorPalette}>Color</label>
            <div
                onClick={openTextColorPalette}
                style={{
                    backgroundColor: `${
                        elClickedNode && window.getComputedStyle(elClickedNode).getPropertyValue('color')
                    }`,
                }}
                className='curr-color'
            ></div>
            <BlockPicker
                className={`${isTextPaletteOpen ? 'open' : ''} palette`}
                onChange={handleColorChange}
                triangle={'hide'}
                color={(elClickedNode && window.getComputedStyle(elClickedNode).getPropertyValue('color')) || '#000'}
            />
        </div>
    )
}
