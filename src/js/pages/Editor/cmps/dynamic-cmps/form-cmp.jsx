import { useState } from 'react'
import DynamicCmp from '../dynamic-cmp'
import { ButtonCmp } from './button-cmp'
import DynamicElement from './dynamic-element'
import { H2Cmp } from './h2-cmp'
import { InputCmp } from './input-cmp'
import { PCmp } from './p-cmp'
import TextCmp from './txt-cmp'

export function FormCmp({ cmp, handleClick, onHover }) {
    const inputsMap = cmp.cmps.reduce((acc, c) => {
        if (c.type !== 'input') return acc

        acc[c.name] = ''
        return acc
    }, {})
    const [inputsValues, setInputsValues] = useState(inputsMap)

    function onSubmit(ev) {
        ev.preventDefault()
        for (const key of Object.keys(inputsValues)) {
            console.log(`The value for ${key} is: ${inputsValues[key]}`)
        }
    }

    function handleChange(ev) {
        const value = ev.target.value
        const field = ev.target.name

        setInputsValues(prev => ({ ...prev, [field]: value }))
    }

    return (
        <form
            className={cmp.name}
            style={cmp.style}
            onClick={e => handleClick(e, cmp)}
            onMouseOver={onHover}
            onMouseOut={ev => ev.currentTarget.classList.remove('hover')}
            onSubmit={onSubmit}
        >
            {cmp.cmps?.map(innerCmp => {
                if (innerCmp.type === 'label') {
                    return (
                        <label
                            className={innerCmp.name}
                            key={innerCmp.id}
                            style={cmp.style}
                            onClick={e => handleClick(e, cmp)}
                            placeholder={cmp.content?.placeholder}
                            // name={innerCmp.name}
                            onMouseOver={onHover}
                            onMouseOut={ev => ev.currentTarget.classList.remove('hover')}
                            onChange={handleChange}
                        ></label>
                    )
                } else if (innerCmp.type === 'input') {
                    return (
                        <input
                            className={innerCmp.name}
                            key={innerCmp.id}
                            style={cmp.style}
                            name={innerCmp.name}
                            onClick={e => handleClick(e, cmp)}
                            placeholder={cmp.content?.placeholder}
                            onMouseOver={onHover}
                            onMouseOut={ev => ev.currentTarget.classList.remove('hover')}
                            onChange={handleChange}
                        ></input>
                    )
                } else
                    return (
                        <DynamicElement cmp={innerCmp} handleClick={handleClick} onHover={onHover} key={innerCmp.id} />
                    )
            })}
        </form>
    )
}
