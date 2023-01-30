import { useSelector } from 'react-redux'
import { EditVideo } from './edit-modules/edit-video'
import React, { useState } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { EditSizes } from './edit-modules/edit-sizes'
import { EditDiv } from './edit-modules/edit-div'
import { EditImg } from './edit-modules/edit-img'
import { EditForm } from './edit-modules/edit-form'
import { EditMap } from './edit-modules/edit-map'
import { AiOutlineLayout } from 'react-icons/ai'
import { IoMdBrush } from 'react-icons/io'
import { BsLightning } from 'react-icons/bs'
import { EditAnchor } from './edit-modules/edit-anchor'
import { TextToolbar } from './ui-cmps/text-toolbar'
import { saveCmp } from '../../../store/wap/wap.action'
import { showErrorMsg } from '../../../services/event-bus.service'
import TextColorPick from './edit-modules/text-color-pick'
import { BgColorPick } from './edit-modules/bg-color-pick'
import { BorderColorPick } from './edit-modules/border-color-pick'
import { FontSelect } from './edit-modules/font-select'
import * as Select from '@radix-ui/react-select'
import { CheckIcon } from '@radix-ui/react-icons'
import classNames from 'classnames'
import TextShadowSelect from './edit-modules/text-shadow-select'
import { FontSizeSlider } from './edit-modules/font-size-slider'
import { BorderRadiusSlider } from './edit-modules/border-radius-slider'
import { LineHeightSlider } from './edit-modules/line-height-slider'
import { EditSubscribe } from './edit-modules/edit-subscribe'
import { EditSocial } from './edit-modules/edit-social'
import { EditSchedule } from './edit-modules/edit-schedule'
import { EditChat } from './edit-modules/edit-chat'

export function EditTabs({ context, cmpTitle }) {
    const [isTextPaletteOpen, setIsTextPaletteOpen] = useState(false)
    const [isBorderPaletteOpen, setIsBorderPaletteOpen] = useState(false)
    const [isBgPaletteOpen, setIsBgPaletteOpen] = useState(false)

    const clickedCmp = useSelector(storeState => storeState.wapModule.clickedCmp)
    const elClickedNode = useSelector(storeState => storeState.wapModule.elClickedNode)
    const lastClickedCmp = useSelector(storeState => storeState.wapModule.clickedCmp)

    const [borderRadiusValue, setBorderRadiusValue] = useState(
        (elClickedNode && [parseInt(window.getComputedStyle(elClickedNode).getPropertyValue('border-radius'))]) || [0]
    )
    const [fontSizeValue, setFontSizeValue] = useState(
        (elClickedNode && [parseInt(window.getComputedStyle(elClickedNode).getPropertyValue('font-size'))]) || [0]
    )

    async function handleTextStyleChange(styleToEdit, value) {
        if (!lastClickedCmp?.style) lastClickedCmp.style = {}
        if (lastClickedCmp?.style[styleToEdit] === value) value = 'unset'
        lastClickedCmp.style = { ...lastClickedCmp.style, [styleToEdit]: value }
        try {
            await saveCmp(lastClickedCmp)
        } catch (err) {
            console.log(`Failed to save cmp - ${lastClickedCmp} in handleTextStyleChange`, err)
            showErrorMsg('Failed to save changes. Please try again later')
        }
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

    function openTextColorPalette() {
        setIsBorderPaletteOpen(false)
        setIsBgPaletteOpen(false)
        setIsTextPaletteOpen(prev => !prev)
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
            showErrorMsg('Failed to save changes. Please try again later')
        }
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
            console.log(`Failed to save cmp - ${lastClickedCmp} in handleFontStyleCommit`, err)
            showErrorMsg('Failed to save changes. Please try again later')
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
            console.log(`Failed to save cmp - ${lastClickedCmp} in handleBorderSliderCommit`, err)
            showErrorMsg('Failed to save changes. Please try again later')
        }
    }

    async function handleLineHeightSliderChange(ev) {
        elClickedNode.style.lineHeight = `${ev[0]}px`
    }

    async function handleLineHeightSliderCommit(ev) {
        lastClickedCmp.style = { ...lastClickedCmp.style, lineHeight: `${ev[0]}px` }
        try {
            await saveCmp(lastClickedCmp)
        } catch (err) {
            console.log(`Failed to save cmp - ${lastClickedCmp} in handleLineHeightSliderCommit`, err)
            showErrorMsg('Failed to save changes. Please try again later')
        }
    }

    const SelectItem = React.forwardRef(({ children, className, ...props }, forwardedRef) => {
        return (
            <Select.Item className={classNames('SelectItem', className)} {...props} ref={forwardedRef}>
                <Select.ItemText>{children}</Select.ItemText>
                <Select.ItemIndicator className='SelectItemIndicator'>
                    <CheckIcon />
                </Select.ItemIndicator>
            </Select.Item>
        )
    })

    return (
        <>
            <Tabs.Root className='TabsRoot' defaultValue='tab1'>
                {cmpTitle !== 'Text' && cmpTitle !== 'Title' && cmpTitle !== 'Button' && (
                    <div className='expanded-content TabsContent tabs-inner-content'>
                        {context === 'div' && <EditDiv clickedCmp={clickedCmp} elClickedNode={elClickedNode} />}
                        {context === 'social' && <EditSocial clickedCmp={clickedCmp} elClickedNode={elClickedNode} />}
                        {context === 'img' && <EditImg clickedCmp={clickedCmp} />}
                        {context === 'form' && <EditForm clickedCmp={clickedCmp} />}
                        {context === 'subscribe' && <EditSubscribe clickedCmp={clickedCmp} />}
                        {context === 'map' && <EditMap clickedCmp={clickedCmp} />}
                        {context === 'video' && <EditVideo clickedCmp={clickedCmp} />}
                        {context === 'a' && <EditAnchor clickedCmp={clickedCmp} />}
                        {context === 'schedule' && <EditSchedule clickedCmp={clickedCmp} />}
                        {context === 'chat' && <EditChat clickedCmp={clickedCmp} />}
                    </div>
                )}
                <div className='expanded-content adjust inside-accordion TabsContent tabs-inner-content'>
                    <TextToolbar elClickedNode={elClickedNode} handleTextStyleChange={handleTextStyleChange} />
                    <TextColorPick
                        openTextColorPalette={openTextColorPalette}
                        elClickedNode={elClickedNode}
                        isTextPaletteOpen={isTextPaletteOpen}
                        handleColorChange={handleColorChange}
                    />
                    <BgColorPick
                        openBgColorPalette={openBgColorPalette}
                        elClickedNode={elClickedNode}
                        isBgPaletteOpen={isBgPaletteOpen}
                        handleColorChange={handleColorChange}
                    />
                    <BorderColorPick
                        openBorderColorPalette={openBorderColorPalette}
                        elClickedNode={elClickedNode}
                        isBorderPaletteOpen={isBorderPaletteOpen}
                        handleColorChange={handleColorChange}
                    />
                    <FontSelect handleFontFamilyChange={handleFontFamilyChange} SelectItem={SelectItem} />
                    <TextShadowSelect handleTextShadowChange={handleTextShadowChange} SelectItem={SelectItem} />
                    <FontSizeSlider
                        elClickedNode={elClickedNode}
                        handleFontSliderChange={handleFontSliderChange}
                        handleFontSliderCommit={handleFontSliderCommit}
                    />
                    <BorderRadiusSlider
                        elClickedNode={elClickedNode}
                        handleBorderSliderChange={handleBorderSliderChange}
                        handleBorderSliderCommit={handleBorderSliderCommit}
                    />
                    <LineHeightSlider
                        elClickedNode={elClickedNode}
                        handleLineHeightSliderChange={handleLineHeightSliderChange}
                        handleLineHeightSliderCommit={handleLineHeightSliderCommit}
                    />
                </div>
                <div className='TabsContent tabs-inner-content'>
                    <EditSizes />
                </div>
            </Tabs.Root>
        </>
    )
}
