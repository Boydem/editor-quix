import DynamicCmp from '../dynamic-cmp'

export function DivCmp({ cmp, onSelectCmp, onHoverCmp, selectedActionsRef, setElHoveredNode }) {
    let classes = cmp.name + ' '
    if (cmp.class) {
        classes += cmp.class?.join(' ')
    }

    return (
        <div
            className={classes}
            style={cmp.style}
            onClick={e => onSelectCmp(e, cmp)}
            onMouseOver={onHoverCmp}
            onMouseOut={ev => ev.currentTarget.classList.remove('hover')}
            id={cmp.cmpId ? cmp.cmpId : null}
        >
            {cmp.cmps?.map(c => {
                return (
                    <DynamicCmp
                        cmp={c}
                        key={c.id}
                        selectedActionsRef={selectedActionsRef}
                        setElHoveredNode={setElHoveredNode}
                        onSelectCmp={onSelectCmp}
                        onHoverCmp={onHoverCmp}
                    />
                )
            })}
        </div>
    )
}
