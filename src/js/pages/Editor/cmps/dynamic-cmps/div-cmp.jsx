import DynamicCmp from '../dynamic-cmp'

export function DivCmp({ cmp, handleClick }) {
    return (
        <div className={cmp.name} style={cmp.style} onClick={e => handleClick(e, cmp)}>
            {cmp.cmps?.map(c => {
                return <DynamicCmp cmp={c} key={c.id} />
            })}
        </div>
    )
}
