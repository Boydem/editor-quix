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
import SelectUnit from '../ui-cmps/select'

export function EditAdjusts() {
    const expandedRef = useRef()
    function setIsExpanded() {
        expandedRef.current.classList.toggle('hidden')
    }

    const lastClickedCmp = useSelector(storeState => storeState.wapModule.clickedCmp)
    const elClickedNode = useSelector(storeState => storeState.wapModule.elClickedNode)

    const sizeOptions = [
        { name: 'opacity', title: 'Opacity', unit: '%', value: 0 },
        { name: 'rotate', title: 'Rotate', unit: 'deg', value: 0 },
        { name: 'scale', title: 'Scale', unit: '%', value: 0 },
        { name: 'skew', title: 'Skew', unit: 'deg', value: 0 },
        { name: 'translateX', title: 'TranslateX', unit: 'px', value: 0 },
        { name: 'translateY', title: 'TranslateY', unit: 'px', value: 0 },
    ]

    const [propToEdit, setPropToEdit] = useState(sizeOptions)

    function handleChange(ev, idx) {
        ev.preventDefault()
        // if (!lastClickedCmp) return
        const { name, value } = ev.target
        const newPropsToEdit = [...propToEdit]
        newPropsToEdit[idx] = { ...newPropsToEdit[idx], value: value }
        setPropToEdit(newPropsToEdit)
        const unit = ev.target.getAttribute('info')
        if (lastClickedCmp.style) {
            lastClickedCmp.style = { ...lastClickedCmp.style, [name]: `${value + unit}` }
        } else {
            lastClickedCmp.style = { [name]: `${value + unit}` }
        }
        saveCmp(lastClickedCmp)
    }

    return (
        <div className='adjust inside-accordion'>
            <div className='header' onClick={setIsExpanded}>
                <p>Adjust</p>
                <button>
                    <BsChevronDown />
                </button>
            </div>
            <div className='option-body expanded-content hidden' ref={expandedRef}>
                {propToEdit.map((option, idx) => (
                    <div key={idx} className='param-box grid-2-col'>
                        <label htmlFor={option.name}>{option.title}</label>
                        <div className='input-wrapper'>
                            <input
                                info={option.unit}
                                type='number'
                                name={option.name}
                                id={option.name}
                                value={option.value}
                                onChange={ev => handleChange(ev, idx)}
                            />
                            <div className='unit'>
                                <SelectUnit />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
