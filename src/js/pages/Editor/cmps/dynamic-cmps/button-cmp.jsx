export function ButtonCmp({ cmp, handleClick }) {
    let classes = cmp.name + ' '
    if (cmp.class) {
        classes += cmp.class?.join(' ')
    }
    return (
        <button className={classes} style={cmp.style} onClick={e => handleClick(e, cmp)}>
            {cmp.content.txt}
        </button>
    )
}
