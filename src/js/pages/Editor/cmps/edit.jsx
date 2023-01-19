import { useRef, useState } from 'react'
import { BlockPicker } from 'react-color'
import { BsChevronDown } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { saveCmp } from '../../../store/wap/wap.action'
import {
    AiOutlineAlignLeft,
    AiOutlineAlignRight,
    AiOutlineAlignCenter,
    AiOutlineBold,
    AiOutlineItalic,
    AiOutlineUnderline,
} from 'react-icons/ai'
import React from 'react'
import * as Slider from '@radix-ui/react-slider'

export function Edit() {
    const [isTextPaletteOpen, setIsTextPaletteOpen] = useState(false)
    const [isBorderPaletteOpen, setIsBorderPaletteOpen] = useState(false)
    const [isBgPaletteOpen, setIsBgPaletteOpen] = useState(false)
    const lastClickedCmp = useSelector(storeState => storeState.wapModule.clickedCmp)
    const elClickedNode = useSelector(storeState => storeState.wapModule.elClickedNode)
    const expandedRef = useRef()
    function setIsExpanded() {
        expandedRef.current.classList.toggle('hidden')
    }

    function openTextColorPalette() {
        setIsBorderPaletteOpen(false)
        setIsBgPaletteOpen(false)
        setIsTextPaletteOpen(prev => !prev)
    }
    function openBorderColorPalette() {
        setIsTextPaletteOpen(false)
        setIsBgPaletteOpen(false)
        setIsBorderPaletteOpen(prev => !prev)
    }
    function openBgColorPalette() {
        setIsTextPaletteOpen(false)
        setIsBorderPaletteOpen(false)
        setIsBgPaletteOpen(prev => !prev)
    }

    function handleColorChange(color, event) {
        const hex = color.hex
        if (isTextPaletteOpen) {
            lastClickedCmp.style = { ...lastClickedCmp.style, color: hex }
            elClickedNode.style.color = hex
        } else if (isBorderPaletteOpen) {
            lastClickedCmp.style = { ...lastClickedCmp.style, borderColor: hex }
            elClickedNode.style.borderColor = hex
        } else if (isBgPaletteOpen) {
            lastClickedCmp.style = { ...lastClickedCmp.style, backgroundColor: hex }
            elClickedNode.style.backgroundColor = hex
        }
        saveCmp(lastClickedCmp)
    }

    function handleTextStyleChange(styleToEdit, value) {
        if (!lastClickedCmp?.style) lastClickedCmp.style = {}
        if (lastClickedCmp?.style[styleToEdit] === value) value = 'unset'
        lastClickedCmp.style = { ...lastClickedCmp.style, [styleToEdit]: value }
        return saveCmp(lastClickedCmp)
    }

    function handleFontSliderChange(ev) {
        lastClickedCmp.style = { ...lastClickedCmp.style, fontSize: ev[0] }
        saveCmp(lastClickedCmp)
    }
    function handleBorderSliderChange(ev) {
        lastClickedCmp.style = { ...lastClickedCmp.style, borderRadius: ev[0] }
        saveCmp(lastClickedCmp)
    }

    return (
        <div className='inside-accordion'>
            <div className='header' onClick={setIsExpanded}>
                <p>Edit</p>
                <button>
                    <BsChevronDown />
                </button>
            </div>

            <div className='expanded-content hidden' ref={expandedRef}>
                <div className='color-pick'>
                    <button className='color-pick-label' onClick={openTextColorPalette}>
                        Text Color
                    </button>
                    {isTextPaletteOpen && (
                        <BlockPicker
                            className='palette'
                            onChange={handleColorChange}
                            triangle={'hide'}
                            color={elClickedNode?.style.color}
                        />
                    )}
                </div>
                <div className='color-pick'>
                    <button className='color-pick-label' onClick={openBgColorPalette}>
                        Background Color
                    </button>
                    {isBgPaletteOpen && (
                        <BlockPicker
                            className='palette'
                            onChange={handleColorChange}
                            triangle={'hide'}
                            color={elClickedNode?.style.backgroundColor}
                        />
                    )}
                </div>
                <div className='color-pick'>
                    <button className='color-pick-label' onClick={openBorderColorPalette}>
                        Border Color
                    </button>
                    {isBorderPaletteOpen && (
                        <BlockPicker
                            className='palette'
                            onChange={handleColorChange}
                            triangle={'hide'}
                            color={elClickedNode?.style.borderColor}
                        />
                    )}
                </div>

                <div className='text-decoration'>
                    <button
                        title='Bold'
                        onClick={() => handleTextStyleChange('fontWeight', 'bold')}
                        className='btn bold-btn'
                    >
                        <AiOutlineBold />
                    </button>
                    <button
                        title='Italic'
                        onClick={() => handleTextStyleChange('fontStyle', 'italic')}
                        className='btn italic-btn'
                    >
                        <AiOutlineItalic />
                    </button>
                    <button
                        title='Underline'
                        onClick={() => handleTextStyleChange('textDecoration', 'underline')}
                        className='btn underline-btn'
                    >
                        <AiOutlineUnderline />
                    </button>
                    <button
                        title='Align-Left'
                        onClick={() => handleTextStyleChange('textAlign', 'start')}
                        className='btn align-left-btn'
                    >
                        <AiOutlineAlignLeft />
                    </button>
                    <button
                        title='Align-Center'
                        onClick={() => handleTextStyleChange('textAlign', 'center')}
                        className='btn align-center-btn'
                    >
                        <AiOutlineAlignCenter />
                    </button>
                    <button
                        title='Align-Right'
                        onClick={() => handleTextStyleChange('textAlign', 'end')}
                        className='btn align-right-btn'
                    >
                        <AiOutlineAlignRight />
                    </button>
                </div>

                <form className='slider-form'>
                    <label htmlFor=''>Font Size</label>
                    <Slider.Root
                        className='SliderRoot'
                        defaultValue={[1]}
                        max={100}
                        step={1}
                        aria-label='Volume'
                        onValueChange={handleFontSliderChange}
                    >
                        <Slider.Track className='SliderTrack'>
                            <Slider.Range className='SliderRange' />
                        </Slider.Track>
                        <Slider.Thumb className='SliderThumb' />
                    </Slider.Root>
                </form>
                <form className='slider-form'>
                    <label htmlFor=''>Border Radius</label>
                    <Slider.Root
                        className='SliderRoot'
                        defaultValue={[1]}
                        max={50}
                        step={1}
                        aria-label='Volume'
                        onValueChange={handleBorderSliderChange}
                    >
                        <Slider.Track className='SliderTrack'>
                            <Slider.Range className='SliderRange' />
                        </Slider.Track>
                        <Slider.Thumb className='SliderThumb' />
                    </Slider.Root>
                </form>
            </div>
        </div>
    )
}
