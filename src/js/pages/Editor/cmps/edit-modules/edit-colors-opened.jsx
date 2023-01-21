import React from 'react'
import { useRef, useState } from 'react'
import * as Select from '@radix-ui/react-select'
import classnames from 'classnames'
import { BlockPicker } from 'react-color'
import { IoMdColorFill } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { CheckIcon } from '@radix-ui/react-icons'
import * as Slider from '@radix-ui/react-slider'

import { saveCmp } from '../../../../store/wap/wap.action'
import { TextShadowSelect } from '../text-shadow-select'
import { FontFamilySelect } from '../font-family-select'
import { TextToolbar } from '../ui-cmps/text-toolbar'

export function EditColorsOpened() {
    const lastClickedCmp = useSelector(storeState => storeState.wapModule.clickedCmp)
    const elClickedNode = useSelector(storeState => storeState.wapModule.elClickedNode)
    const [isTextPaletteOpen, setIsTextPaletteOpen] = useState(false)
    const [isBorderPaletteOpen, setIsBorderPaletteOpen] = useState(false)
    const [isBgPaletteOpen, setIsBgPaletteOpen] = useState(false)
    const [borderRadiusValue, setBorderRadiusValue] = useState(
        (elClickedNode && [parseInt(window.getComputedStyle(elClickedNode).getPropertyValue('border-radius'))]) || [0]
    )
    const [fontSizeValue, setFontSizeValue] = useState(
        (elClickedNode && [parseInt(window.getComputedStyle(elClickedNode).getPropertyValue('font-size'))]) || [0]
    )

    const expandedRef = useRef()

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

    function handleFontSliderChange(ev) {
        setFontSizeValue(ev[0])
        elClickedNode.style.fontSize = `${ev[0]}px`
    }

    async function handleFontSliderCommit(ev) {
        elClickedNode.style.fontSize = `${ev[0]}px`
        lastClickedCmp.style = { ...lastClickedCmp.style, fontSize: ev[0] }
        try {
            await saveCmp(lastClickedCmp)
        } catch (err) {
            console.log(`Failed to save cmp - ${lastClickedCmp} in handleFontStyleChange`, err)
        }
    }
    async function handleBorderSliderChange(ev) {
        setBorderRadiusValue(ev[0])
        elClickedNode.style.borderRadius = `${ev[0]}px`
    }
    async function handleBorderSliderCommit(ev) {
        lastClickedCmp.style = { ...lastClickedCmp.style, borderRadius: ev[0] }
        try {
            await saveCmp(lastClickedCmp)
        } catch (err) {
            console.log(`Failed to save cmp - ${lastClickedCmp} in handleBorderSliderChange`, err)
        }
    }

    return (
        <div className='adjust inside-accordion'>
            <div className='expanded-content' ref={expandedRef}>
                {/* <TextToolbar handleTextStyleChange={handleTextStyleChange} /> */}
                {/* <div className='color-pick'>
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
                </div> */}
                {/* <div className='color-pick'>
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
                </div> */}

                <div className='selector'>
                    {/* <SelectFontFamily /> */}
                    <p>Font Select</p>
                    <FontFamilySelect handleFontFamilyChange={handleFontFamilyChange} SelectItem={SelectItem} />
                </div>

                <div className='selector'>
                    {/* <SelectTextShadow /> */}
                    <p>Text Shadow </p>
                    <TextShadowSelect handleTextShadowChange={handleTextShadowChange} SelectItem={SelectItem} />
                </div>

                <form className='slider-form'>
                    <label htmlFor=''>Font Size</label>
                    <Slider.Root
                        // value={fontSliderValue}
                        value={
                            (elClickedNode && [
                                parseInt(window.getComputedStyle(elClickedNode).getPropertyValue('font-size')),
                            ]) || [16]
                        }
                        className='SliderRoot'
                        defaultValue={[16]}
                        max={72}
                        min={8}
                        step={1}
                        aria-label='Volume'
                        onValueChange={handleFontSliderChange}
                        onValueCommit={handleFontSliderCommit}
                    >
                        <Slider.Track className='SliderTrack' value={50}>
                            <Slider.Range className='SliderRange' />
                        </Slider.Track>
                        <Slider.Thumb className='SliderThumb' />
                    </Slider.Root>
                </form>
                <form className='slider-form'>
                    <label htmlFor=''>Border Radius</label>
                    <Slider.Root
                        value={
                            (elClickedNode && [
                                parseInt(window.getComputedStyle(elClickedNode).getPropertyValue('border-radius')),
                            ]) || [0]
                        }
                        className='SliderRoot'
                        max={50}
                        step={1}
                        aria-label='Volume'
                        onValueChange={handleBorderSliderChange}
                        onValueCommit={handleBorderSliderCommit}
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
