import { useState } from 'react'
import { useSelector } from 'react-redux'
import { socketService, SOCKET_EMIT_SEND_LEAD } from '../../../../services/socket.service'
import { makeId } from '../../../../services/util.service'
import { saveWap } from '../../../../store/wap/wap.action'
import DynamicCmp from '../dynamic-cmp'

export function FormCmp({ cmp, onSelectCmp, onHoverCmp }) {
    const clickedCmp = useSelector(storeState => storeState.wapModule.clickedCmp)
    const wap = useSelector(storeState => storeState.wapModule.wap)

    const inputsMap = cmp.cmps.reduce((acc, c) => {
        if (c.type === 'label' && c.cmps[0]) {
            acc[c.cmps[0].inputName] = ''
            return acc
        } else if (c.type !== 'input') return acc

        acc[c.inputName] = ''
        return acc
    }, {})
    const [inputsValues, setInputsValues] = useState(inputsMap)

    function cleanInputsValues() {
        return cmp.cmps.reduce((acc, innerCmp) => {
            if (innerCmp.type !== 'label') return acc
            // It is label
            acc.push(innerCmp.cmps[0].inputName)
            return acc
        }, [])
    }

    function onSubmit(ev) {
        ev.preventDefault()
        const labels = cleanInputsValues()
        if (!wap.leads) wap.leads = []

        let leadData
        for (const key of Object.keys(inputsValues)) {
            if (!labels.includes(key)) continue
            leadData = { ...leadData, [key]: inputsValues[key] }
        }
        leadData = { ...leadData, date: new Date().getTime() }
        let lead = { id: makeId(), data: leadData, status: 'new' }
        // lead = { ...lead, id: makeId(), createdAt: new Date().getTime() }
        wap.leadsBoards[0].items.push(lead)
        socketService.emit(SOCKET_EMIT_SEND_LEAD, { data: leadData, to: wap.owner })
        try {
            saveWap(wap)
        } catch (err) {
            console.log(err)
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
            onClick={e => onSelectCmp(e, cmp)}
            onMouseOver={onHoverCmp}
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
                            onClick={e => onSelectCmp(e, cmp)}
                            // placeholder={cmp.content?.placeholder}
                            // name={innerCmp.name}
                            onMouseOver={onHoverCmp}
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
                                    onClick={e => onSelectCmp(e, cmp)}
                                    placeholder={innerCmp.cmps[0]?.content?.placeholder}
                                    onMouseOver={onHoverCmp}
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
                            onClick={e => onSelectCmp(e, cmp)}
                            placeholder={innerCmp.content?.placeholder}
                            onMouseOver={onHoverCmp}
                            onMouseOut={ev => ev.currentTarget.classList.remove('hover')}
                            onChange={handleChange}
                        ></input>
                    )
                } else {
                    /* CHANGED I HAVE TO CHECK!!! */
                }
                return <DynamicCmp cmp={innerCmp} onSelectCmp={onSelectCmp} onHoverCmp={onHoverCmp} key={innerCmp.id} />
            })}
        </form>
    )
}
