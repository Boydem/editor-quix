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
    // { name: 'skew', title: 'Skew', unit: 'deg' },
    // { name: 'translateX', title: 'TranslateX', unit: 'px', value: 0 },
    // { name: 'translateY', title: 'TranslateY', unit: 'px', value: 0 },

    useEffect(() => {
        const clickedCmpProps = propOptions.reduce((acc, opt) => {
            acc[opt] = (elClickedNode && [parseInt(window.getComputedStyle(elClickedNode).getPropertyValue(opt))]) || [
                0,
            ]
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
        console.log(propsToEdit)
        saveCmp(lastClickedCmp)
    }

    function onUnitChange(unit) {
        setUnit(unit)
    }

    return (
        <div className='option-body extended-content adjust-inputs'>
            {propOptions.map(opt => (
                <div key={opt.name} className='param-box'>
                    <label htmlFor={opt.name}>{opt.title}</label>
                    <div className='input-wrapper'>
                        <input
                            type='number'
                            info={opt.unit}
                            name={opt.name}
                            id={opt.name}
                            value={propsToEdit[opt.name] || 0}
                            onChange={handleChange}
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
