import { useEffect, useRef, useState } from 'react'
import { BsChevronDown } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { saveCmp } from '../../../../store/wap/wap.action'
import SelectUnit from '../ui-cmps/select'

export function EditSizes() {
    const elClickedNode = useSelector(storeState => storeState.wapModule.elClickedNode)
    const lastClickedCmp = useSelector(storeState => storeState.wapModule.clickedCmp)
    const [unit, setUnit] = useState('px')
    const [propsToEdit, setPropsToEdit] = useState({ height: 0, width: 0, opacity: 0, rotate: 0, scale: 0 })

    const propOptions = [
        { name: 'width', title: 'Width', unit: unit, unitOpts: ['px', '%'] },
        { name: 'height', title: 'Height', unit: unit, unitOpts: ['px', '%'] },
        { name: 'opacity', title: 'Opacity', unit: '%', unitOpts: ['%'] },
        { name: 'rotate', title: 'Rotate', unit: 'deg', unitOpts: ['deg'] },
        { name: 'scale', title: 'Scale', unit: '%', unitOpts: ['%'] },
    ]

    useEffect(() => {
        const clickedCmpProps = propOptions.reduce((acc, opt) => {
            let propValue =
                elClickedNode && parseFloat(window.getComputedStyle(elClickedNode).getPropertyValue(opt.name))

            if (opt.name === 'opacity' || opt.name === 'scale') propValue *= 100
            acc[opt.name] = propValue
            return acc
        }, {})
        setPropsToEdit(clickedCmpProps)

        return () => {
            setUnit('px')
        }
    }, [elClickedNode])

    function handleChange(ev) {
        ev.preventDefault()
        const { name, value } = ev.target
        const unit = ev.target.getAttribute('info')
        setPropsToEdit(prevProps => ({ ...prevProps, [name]: value }))
        if (lastClickedCmp.style) {
            lastClickedCmp.style = { ...lastClickedCmp.style, [name]: `${value + unit}` }
        } else {
            lastClickedCmp.style = { [name]: `${value + unit}` }
        }
        saveCmp(lastClickedCmp)
    }

    function onUnitChange(unit) {
        setUnit(unit)
    }

    return (
        <div className='adjust-inputs gap-y'>
            {propOptions.map(opt => (
                <div key={opt.name} className='param-box'>
                    <label htmlFor={opt.name}>{opt.title}</label>
                    <div className='input-wrapper'>
                        <input
                            type='number'
                            info={opt.unit}
                            name={opt.name}
                            id={opt.name}
                            value={+propsToEdit[opt.name] || ''}
                            onChange={handleChange}
                            placeholder='0'
                        />
                        <div className='unit'>
                            <SelectUnit onUnitChange={onUnitChange} unit={opt.unit} unitOpts={opt.unitOpts} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
