import DynamicCmp from '../dynamic-cmp'

export function DivCmp({ cmp }) {
    return (
        <div className={cmp.name} style={cmp.style}>
            {cmp.cmps?.map(c => {
                return <DynamicCmp cmp={c} key={c.id} />
            })}
        </div>
    )
}
