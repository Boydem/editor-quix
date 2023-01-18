import DynamicCmp from '../dynamic-cmp'

export function DivCmp({ cmp, handleClick }) {
    let classes = cmp.name + ' '
    if (cmp.class) {
        classes += cmp.class?.join(' ')
    }
    return (
        <div className={classes} style={cmp.style} onClick={e => handleClick(e, cmp)}>
            {cmp.cmps?.map(c => {
                return <DynamicCmp cmp={c} key={c.id} />
            })}
        </div>
    )
}
