import { useRef, useState } from 'react'
import { BsChevronDown } from 'react-icons/bs'
import { saveCmp } from '../../../../store/wap/wap.action'

export function EditFormOpened({ clickedCmp }) {
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
                console.log('FOUND', cmp)
                cmp.cmps[0].inputName = value
            }
            labelIdx++
        })
        saveCmp(clickedCmp)

        setInputsValues(prev => ({ ...prev, [field]: value }))
    }

    function onDisableLabel(idx) {
        console.log(idx)
        console.log(clickedCmp)
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
            <div className='expanded-content edit-form'>
                <div className='wrapper'>
                    <p className='heading'>Enter the name of the fields</p>
                    {inputsArr.map((input, idx) => {
                        return (
                            <div key={idx} className='input-option'>
                                <input onChange={ev => handleChange(ev, idx)} value={input} name={input} />
                                <button className='btn' onClick={() => onDisableLabel(idx)}>
                                    X
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
