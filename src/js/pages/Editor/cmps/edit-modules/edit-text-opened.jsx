import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import { BlockPicker } from 'react-color'
import { BsChevronDown } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { saveCmp } from '../../../../store/wap/wap.action'
import { TextToolbar } from '../ui-cmps/text-toolbar'

export function EditTextOpened() {
    const [isTextPaletteOpen, setIsTextPaletteOpen] = useState(false)
    const [isBorderPaletteOpen, setIsBorderPaletteOpen] = useState(false)
    const [isBgPaletteOpen, setIsBgPaletteOpen] = useState(false)
    const lastClickedCmp = useSelector(storeState => storeState.wapModule.clickedCmp)
    const elClickedNode = useSelector(storeState => storeState.wapModule.elClickedNode)
    const expandedRef = useRef()

    

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
        if (!lastClickedCmp?.style) lastClickedCmp.style = {}
        if (lastClickedCmp?.style[styleToEdit] === value) value = 'unset'
        lastClickedCmp.style = { ...lastClickedCmp.style, [styleToEdit]: value }
        try {
            await saveCmp(lastClickedCmp)
        } catch (err) {
            console.log(`Failed to save cmp - ${lastClickedCmp} in handleTextStyleChange`, err)
        }
    }

    return (
        <div className='adjust inside-accordion'>
            <div className='expanded-content' ref={expandedRef}>
                <TextToolbar elClickedNode={elClickedNode} handleTextStyleChange={handleTextStyleChange} />

                <div className='color-pick'>
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
                        color={
                            (elClickedNode && window.getComputedStyle(elClickedNode).getPropertyValue('color')) ||
                            '#000'
                        }
                    />
                </div>
                <div className='color-pick'>
                    <label onClick={openBgColorPalette}>Background Color</label>
                    <div
                        onClick={openBgColorPalette}
                        style={{
                            backgroundColor: `${
                                elClickedNode &&
                                window.getComputedStyle(elClickedNode).getPropertyValue('background-color')
                            }`,
                        }}
                        className='curr-color'
                    ></div>
                    <BlockPicker
                        className={`${isBgPaletteOpen ? 'open' : ''} palette`}
                        onChange={handleColorChange}
                        triangle={'hide'}
                        color={
                            (elClickedNode &&
                                window.getComputedStyle(elClickedNode).getPropertyValue('background-color')) ||
                            '#000'
                        }
                    />
                </div>
                <div className='color-pick b-btm'>
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
                            (elClickedNode &&
                                window.getComputedStyle(elClickedNode).getPropertyValue('border-color')) ||
                            '#000'
                        }
                    />
                </div>
            </div>
        </div>
    )
}
