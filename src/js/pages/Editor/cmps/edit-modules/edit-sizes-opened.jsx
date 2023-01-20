import { useRef, useState } from 'react'
import { BsChevronDown } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { saveCmp } from '../../../../store/wap/wap.action'
import SelectUnit from '../ui-cmps/select'

export function EditSizesOpened() {
    const lastClickedCmp = useSelector(storeState => storeState.wapModule.clickedCmp)

    const sizeOptions = [
        { name: 'width', title: 'width', unit: 'px', value: 0 },
        { name: 'height', title: 'height', unit: 'px', value: 0 },
        { name: 'minWidth', title: 'min-W', unit: 'px', value: 0 },
        { name: 'minHeight', title: 'min-h', unit: 'px', value: 0 },
        { name: 'maxWidth', title: 'max-w', unit: 'px', value: 0 },
        { name: 'maxHeight', title: 'max-h', unit: 'px', value: 0 },
    ]
    const [propToEdit, setPropToEdit] = useState(sizeOptions)

    function handleChange(ev, idx) {
        ev.preventDefault()
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
        <div className='adjust-inputs'>
            {propToEdit.map((option, idx) => (
                <div key={idx} className='param-box'>
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
    )
}
