import { useRef, useState } from 'react'
import { BsChevronDown } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { uploadService } from '../../../../services/upload.service'
import { saveCmp } from '../../../../store/wap/wap.action'

export function EditForm({ clickedCmp }) {
    const expandedRef = useRef()

    function setIsExpanded() {
        expandedRef.current.classList.toggle('hidden')
    }
    // let labelIndex
    const inputsArr = clickedCmp.cmps?.reduce((acc, c) => {
        if (c.type === 'label' && c.cmps[0]) {
            acc.push(c.cmps[0].inputName)
            return acc
        } else if (c.type !== 'input') return acc

        acc.push(c.inputName)
        return acc
    }, [])
    // const inputsAmount = clickedCmp.cmps.reduce((acc, c) => {
    //     if (c.type === 'label' && c.cmps[0]) {
    //         acc++
    //     }
    //     return acc
    // }, {})

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

    // const [inputsValues, setInputsValues] = useState(inputsMap)
    // console.log(inputsValues)
    if (clickedCmp.type !== 'form') return

    return (
        <div className='adjust inside-accordion'>
            <div className='header' onClick={setIsExpanded}>
                <p>Form</p>
                <button>
                    <BsChevronDown />
                </button>
            </div>
            <div className='expanded-content hidden edit-form' ref={expandedRef}>
                <div className='wrapper'>
                    <p className='heading'>Enter the name of the fields</p>
                    {inputsArr.map((input, idx) => {
                        return (
                            <div key={idx} className='input-option'>
                                {/* {console.log(cmp.id)} */}
                                {/* <label key={keyName}>{keyName}</label> */}
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
