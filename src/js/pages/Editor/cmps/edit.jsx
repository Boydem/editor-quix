import { useRef, useState } from 'react'
import { BlockPicker } from 'react-color'
import { BsChevronDown } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { saveCmp } from '../../../store/wap/wap.action'
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


    function handleTextStyleChange(changeBy) {
        console.log(lastClickedCmp)
        switch (changeBy) {
            case 'bold':
                lastClickedCmp.style = { ...lastClickedCmp.style, fontWeight: 'bold' }
                break
            case 'italic':
                lastClickedCmp.style = { ...lastClickedCmp.style, fontStyle: 'italic' }
                break
            case 'underline':
                lastClickedCmp.style = { ...lastClickedCmp.style, textDecoration: 'underline' }
                break
            case 'align-left':
                lastClickedCmp.style = { ...lastClickedCmp.style, textAlign: 'left' }
                break
            case 'align-center':
                lastClickedCmp.style = { ...lastClickedCmp.style, textAlign: 'center' }
                break
            case 'align-right':
                lastClickedCmp.style = { ...lastClickedCmp.style, textAlign: 'right' }
                break
        }
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
                    <button title='Bold' onClick={() => handleTextStyleChange('bold')} className='btn bold-btn'>
                        <i className='fa-solid fa-bold'></i>
                    </button>
                    <button title='Italic' onClick={() => handleTextStyleChange('italic')} className='btn italic-btn'>
                        <i className='fa-solid fa-italic'></i>
                    </button>
                    <button
                        title='Underline'
                        onClick={() => handleTextStyleChange('underline')}
                        className='btn underline-btn'
                    >
                        <i className='fa-solid fa-underline'></i>
                    </button>
                    <button
                        title='Align-Left'
                        onClick={() => handleTextStyleChange('align-left')}
                        className='btn align-left-btn'
                    >
                        <i className='fa-solid fa-align-left'></i>
                    </button>
                    <button
                        title='Align-Center'
                        onClick={() => handleTextStyleChange('align-center')}
                        className='btn align-center-btn'
                    >
                        <i className='fa-solid fa-align-center'></i>
                    </button>
                    <button
                        title='Align-Right'
                        onClick={() => handleTextStyleChange('align-right')}
                        className='btn align-right-btn'
                    >
                        <i className='fa-solid fa-align-right'></i>
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
