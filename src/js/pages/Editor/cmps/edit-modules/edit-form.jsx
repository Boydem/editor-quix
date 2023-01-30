import { useRef, useState } from 'react'
import { BsChevronDown } from 'react-icons/bs'
import { saveCmp } from '../../../../store/wap/wap.action'
import { RiDeleteBack2Fill } from 'react-icons/ri'
import { GiSightDisabled } from 'react-icons/gi'

export function EditForm({ clickedCmp }) {
    // let labelIndex
    const inputsArr = clickedCmp.cmps?.reduce((acc, c) => {
        if (c.type === 'label' && c.cmps[0]) {
            acc.push(c.cmps[0].inputName)
            return acc
        } else if (c.type !== 'input') return acc

        acc.push(c.inputName)
        return acc
    }, [])

    const [inputsValues, setInputsValues] = useState(inputsArr)

    function handleChange(ev, idx) {
        const value = ev.target.value
        const field = ev.target.name
        let labelIdx = 0
        clickedCmp.cmps.forEach(cmp => {
            if (cmp.type !== 'label') return

            if (labelIdx === idx) {
                cmp.cmps[0].inputName = value
            }
            labelIdx++
        })
        saveCmp(clickedCmp)

        setInputsValues(prev => ({ ...prev, [field]: value }))
    }

    function onDisableLabel(idx) {
        let labelIdx = 0
        clickedCmp.cmps.forEach(cmp => {
            if (cmp.type !== 'label') return

            if (labelIdx === idx) {
                cmp.hidden = !cmp.hidden
            }
            labelIdx++
        })
        saveCmp(clickedCmp)
    }

    if (clickedCmp.type !== 'form') return

    return (
        <div className='adjust inside-accordion'>
            <div className='expanded-content adjust inside-accordion full adjust-inputs full edit-form'>
                <div className='wrapper'>
                    {inputsArr.map((input, idx) => {
                        return (
                            <div key={idx} className='input-option'>
                                <button className='btn btn-edit' onClick={() => onDisableLabel(idx)}>
                                    <GiSightDisabled />
                                </button>
                                <input
                                    onChange={ev => handleChange(ev, idx)}
                                    className='btn-edit input-edit'
                                    value={input}
                                    name={input}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
