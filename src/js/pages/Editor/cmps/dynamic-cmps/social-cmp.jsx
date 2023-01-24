import { useState } from 'react'
import { useSelector } from 'react-redux'
import DynamicCmp from '../dynamic-cmp'
import DynamicElement from './dynamic-element'

export function SocialCmp({ cmp, onSelectCmp, onHoverCmp }) {
    const renderIcon = (icon, index) => {
        const Icon = icon
        return (
            <div key={index}>
                <Icon fontSize={'2rem'} />
            </div>
        )
    }

    return (
        <div
            className={cmp.name}
            style={cmp.style}
            onClick={e => onSelectCmp(e, cmp)}
            onMouseOver={onHoverCmp}
            onMouseOut={ev => ev.currentTarget.classList.remove('hover')}
        >
            {cmp.cmps?.map(innerCmp => {
                if (innerCmp.type === 'a') {
                    return (
                        <a
                            href={innerCmp.content.href}
                            className={innerCmp.name}
                            key={innerCmp.id}
                            style={cmp.style}
                            onClick={e => onSelectCmp(e, cmp)}
                            placeholder={cmp.content?.placeholder}
                            onMouseOver={onHoverCmp}
                            onMouseOut={ev => ev.currentTarget.classList.remove('hover')}
                        >
                            <i className={`${innerCmp?.content?.iconImg} fa-3x`} style={innerCmp.style}></i>
                        </a>
                    )
                } else {
                    /* CHANGED I HAVE TO CHECK!!! */
                }
                return <DynamicCmp cmp={innerCmp} onSelectCmp={onSelectCmp} onHoverCmp={onHoverCmp} key={innerCmp.id} />
            })}
        </div>
    )
}
