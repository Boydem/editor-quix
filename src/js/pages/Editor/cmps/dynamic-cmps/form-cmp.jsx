import { useState } from 'react'
import { useSelector } from 'react-redux'
import DynamicCmp from '../dynamic-cmp'
import DynamicElement from './dynamic-element'

export function FormCmp({ cmp, handleClick, onHover }) {
    const clickedCmp = useSelector(storeState => storeState.wapModule.clickedCmp)
    const inputsMap = cmp.cmps.reduce((acc, c) => {
        if (c.type === 'label' && c.cmps[0]) {
            acc[c.cmps[0].inputName] = ''
            return acc
        } else if (c.type !== 'input') return acc

        acc[c.inputName] = ''
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
                        >
                            {!innerCmp.hidden && innerCmp.cmps[0]?.inputName}
                            {innerCmp.cmps[0] && (
                                <input
                                    className={innerCmp.cmps[0].name}
                                    key={innerCmp.cmps[0].id}
                                    style={cmp.style}
                                    name={innerCmp.cmps[0].inputName}
                                    onClick={e => handleClick(e, cmp)}
                                    placeholder={cmp.content?.placeholder}
                                    onMouseOver={onHover}
                                    onMouseOut={ev => ev.currentTarget.classList.remove('hover')}
                                    onChange={handleChange}
                                ></input>
                            )}
                        </label>
                    )
                } else if (innerCmp.type === 'input') {
                    return (
                        <input
                            className={innerCmp.name}
                            key={innerCmp.id}
                            style={cmp.style}
                            name={innerCmp.inputName}
                            onClick={e => handleClick(e, cmp)}
                            placeholder={cmp.content?.placeholder}
                            onMouseOver={onHover}
                            onMouseOut={ev => ev.currentTarget.classList.remove('hover')}
                            onChange={handleChange}
                        ></input>
                    )
                } else {
                    /* CHANGED I HAVE TO CHECK!!! */
                }
                return <DynamicCmp cmp={innerCmp} handleClick={handleClick} onHover={onHover} key={innerCmp.id} />
            })}
        </form>
    )
}
