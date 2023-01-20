import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import { BlockPicker } from 'react-color'
import { BsChevronDown } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { saveCmp } from '../../../../store/wap/wap.action'
import { TextToolbar } from '../ui-cmps/text-toolbar'

export function EditText() {
    const [isTextPaletteOpen, setIsTextPaletteOpen] = useState(false)
    const [isBorderPaletteOpen, setIsBorderPaletteOpen] = useState(false)
    const [isBgPaletteOpen, setIsBgPaletteOpen] = useState(false)
    const lastClickedCmp = useSelector(storeState => storeState.wapModule.clickedCmp)
    const elClickedNode = useSelector(storeState => storeState.wapModule.elClickedNode)
    const expandedRef = useRef()

    useEffect(() => {
        if (elClickedNode) {
        }
    }, [])

    function setIsExpanded() {
        expandedRef.current.classList.toggle('hidden')
    }

    function openTextColorPalette() {
        setIsBorderPaletteOpen(false)
        setIsBgPaletteOpen(false)
        setIsTextPaletteOpen(prev => !prev)
    }

    async function handleColorChange(color) {
        console.log(color)
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

    return (
        <div className='adjust inside-accordion'>
            <div className='header' onClick={setIsExpanded}>
                <p>Text</p>
                <button>
                    <BsChevronDown />
                </button>
            </div>

            <div className='expanded-content hidden' ref={expandedRef}>
                <TextToolbar elClickedNode={elClickedNode} handleTextStyleChange={handleTextStyleChange} />

                <div className='color-pick b-btm'>
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
            </div>
        </div>
    )
}
