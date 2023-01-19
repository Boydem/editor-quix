import { useState } from 'react'
import DynamicCmp from '../dynamic-cmp'
import { ButtonCmp } from './button-cmp'
import DynamicElement from './dynamic-element'
import { H2Cmp } from './h2-cmp'
import { InputCmp } from './input-cmp'
import { PCmp } from './p-cmp'
import TextCmp from './txt-cmp'

export function FormCmp({ cmp, handleClick, onHover }) {
    const [inputValue, setInputValue] = useState('')

    function onSubmit(ev) {
        ev.preventDefault()
        console.log(inputValue)
    }

    function handleChange(ev) {
        const value = ev.target.value
        const field = ev.target.name

        setInputValue(value)
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
                if (innerCmp.type === 'input') {
                    return (
                        <input
                            className={innerCmp.name}
                            key={innerCmp.id}
                            style={cmp.style}
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
