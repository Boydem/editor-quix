import { useState } from 'react'
import { useSelector } from 'react-redux'
import { socketService, SOCKET_EMIT_SEND_SUBSCRIBE } from '../../../../services/socket.service'
import { saveWap } from '../../../../store/wap/wap.action'
import DynamicCmp from '../dynamic-cmp'

export function SubscribeCmp({ cmp, onSelectCmp, onHoverCmp }) {
    const wap = useSelector(storeState => storeState.wapModule.wap)
    const [subscriber, setSubscriber] = useState('')

    function onSubmit(ev) {
        ev.preventDefault()
        if (!wap.subscribers) wap.subscribers = []
        wap.subscribers.push({ email: subscriber, date: new Date().getTime() })
        socketService.emit(SOCKET_EMIT_SEND_SUBSCRIBE, { email: subscriber, to: wap.owner })
        saveWap(wap)
    }

    function handleChange(ev) {
        const value = ev.target.value

        setSubscriber(value)
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
                            placeholder={cmp.content?.placeholder}
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
                            placeholder={cmp.content?.placeholder}
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
