import React from 'react'
import { useRef, useState } from 'react'
import * as Select from '@radix-ui/react-select'
import classnames from 'classnames'
import { BlockPicker } from 'react-color'
import { BsChevronDown } from 'react-icons/bs'
import { BiFontColor } from 'react-icons/bi'
import { IoMdColorFill } from 'react-icons/io'
import { useSelector } from 'react-redux'
import {
    AiOutlineAlignLeft,
    AiOutlineAlignRight,
    AiOutlineAlignCenter,
    AiOutlineBold,
    AiOutlineItalic,
    AiOutlineUnderline,
} from 'react-icons/ai'
import { CheckIcon } from '@radix-ui/react-icons'
import * as Slider from '@radix-ui/react-slider'

import { saveCmp } from '../../../../store/wap/wap.action'
import { showErrorMsg } from '../../../../services/event-bus.service'
import { TextShadowSelect } from '../text-shadow-select'
import { FontFamilySelect } from '../font-family-select'
import { TextToolbar } from '../ui-cmps/text-toolbar'

export function EditText() {
    const [isTextPaletteOpen, setIsTextPaletteOpen] = useState(false)
    const [isBorderPaletteOpen, setIsBorderPaletteOpen] = useState(false)
    const [isBgPaletteOpen, setIsBgPaletteOpen] = useState(false)
    const lastClickedCmp = useSelector(storeState => storeState.wapModule.clickedCmp)
    const elClickedNode = useSelector(storeState => storeState.wapModule.elClickedNode)
    const expandedRef = useRef()
    function setIsExpanded() {
        expandedRef.current.classList.toggle('hidden')
    }

    const SelectItem = React.forwardRef(({ children, className, ...props }, forwardedRef) => {
        return (
            <Select.Item className={classnames('SelectItem', className)} {...props} ref={forwardedRef}>
                <Select.ItemText>{children}</Select.ItemText>
                <Select.ItemIndicator className='SelectItemIndicator'>
                    <CheckIcon />
                </Select.ItemIndicator>
            </Select.Item>
        )
    })

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

    async function handleFontFamilyChange(val) {
        if (!lastClickedCmp?.style) lastClickedCmp.style = {}
        lastClickedCmp.style = { ...lastClickedCmp.style, fontFamily: val }
        try {
            saveCmp(lastClickedCmp)
        } catch (err) {
            console.log('Failed to save lastClickedCmp edit', err)
        }
    }

    async function handleTextShadowChange(val) {
        if (!lastClickedCmp?.style) lastClickedCmp.style = {}
        lastClickedCmp.style = { ...lastClickedCmp.style, filter: `drop-shadow(0 0 ${val}rem black)` }
        try {
            saveCmp(lastClickedCmp)
        } catch (err) {
            console.log('Failed to save lastClickedCmp at edit', err)
        }
    }

    async function handleColorChange(color) {
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
        try {
            await saveCmp(lastClickedCmp)
        } catch (err) {
            console.log(`Failed to save cmp - ${lastClickedCmp} in handleColorChange`, err)
            // showErrorMsg('Failed to save changes, try again later')
        }
    }

    async function handleTextStyleChange(styleToEdit, value) {
        console.log('styleToEdit:', styleToEdit)
        if (!lastClickedCmp?.style) lastClickedCmp.style = {}
        if (lastClickedCmp?.style[styleToEdit] === value) value = 'unset'
        lastClickedCmp.style = { ...lastClickedCmp.style, [styleToEdit]: value }
        try {
            await saveCmp(lastClickedCmp)
        } catch (err) {
            console.log(`Failed to save cmp - ${lastClickedCmp} in handleTextStyleChange`, err)
        }
    }

    async function handleFontSliderChange(ev) {
        lastClickedCmp.style = { ...lastClickedCmp.style, fontSize: ev[0] }
        try {
            await saveCmp(lastClickedCmp)
        } catch (err) {
            console.log(`Failed to save cmp - ${lastClickedCmp} in handleFontStyleChange`, err)
        }
    }
    async function handleBorderSliderChange(ev) {
        lastClickedCmp.style = { ...lastClickedCmp.style, borderRadius: ev[0] }
        try {
            await saveCmp(lastClickedCmp)
        } catch (err) {
            console.log(`Failed to save cmp - ${lastClickedCmp} in handleeBorderSliderChange`, err)
        }
    }

    return (
        <div className='adjust inside-accordion'>
            <div className='header' onClick={setIsExpanded}>
                <p>Text</p>
                <button>
                    <BsChevronDown />
                </button>
            </div>

            <div className='expanded-content hidden' ref={expandedRef}>
                <TextToolbar handleTextStyleChange={handleTextStyleChange} />

                <div className='color-pick'>
                    <button className='color-pick-label' onClick={openTextColorPalette}>
                        <BiFontColor />
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
                        <IoMdColorFill />
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

                <div className='font-family-select'>
                    {/* <SelectFontFamily /> */}
                    <FontFamilySelect handleFontFamilyChange={handleFontFamilyChange} SelectItem={SelectItem} />
                </div>

                <div className='text-shadow-select'>
                    {/* <SelectTextShadow /> */}
                    <TextShadowSelect handleTextShadowChange={handleTextShadowChange} SelectItem={SelectItem} />
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
