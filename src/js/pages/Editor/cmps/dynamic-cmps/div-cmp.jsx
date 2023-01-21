import DynamicCmp from '../dynamic-cmp'

export function DivCmp({ cmp, handleClick, onHover, selectedActionsRef }) {
    let classes = cmp.name + ' '
    if (cmp.class) {
        classes += cmp.class?.join(' ')
    }

    return (
        <div
            className={classes}
            style={cmp.style}
            onClick={e => handleClick(e, cmp)}
            onMouseOver={onHover}
            onMouseOut={ev => ev.currentTarget.classList.remove('hover')}
        >
            {cmp.cmps?.map(c => {
                return <DynamicCmp cmp={c} key={c.id} selectedActionsRef={selectedActionsRef} />
            })}
        </div>
    )
}
