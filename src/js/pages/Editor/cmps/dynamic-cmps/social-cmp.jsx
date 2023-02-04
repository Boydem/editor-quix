import DynamicCmp from '../dynamic-cmp'

export function SocialCmp({ cmp, onSelectCmp, onHoverCmp }) {
    

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
                }
                return <DynamicCmp cmp={innerCmp} onSelectCmp={onSelectCmp} onHoverCmp={onHoverCmp} key={innerCmp.id} />
            })}
        </div>
    )
}
