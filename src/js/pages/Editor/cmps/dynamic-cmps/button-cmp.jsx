export function ButtonCmp({ cmp, handleClick }) {
    return (
        <button className={cmp.name} style={cmp.style} onClick={e => handleClick(e, cmp)}>
            {cmp.content.txt}
        </button>
    )
}
