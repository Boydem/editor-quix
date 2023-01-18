export function H6Cmp({ cmp, handleClick }) {
    let classes = cmp.name + ' '
    if (cmp.class) {
        classes += cmp.class?.join(' ')
    }
    return (
        <h6 className={classes} style={cmp.style} onClick={e => handleClick(e, cmp)}>
            {cmp.content.txt}
        </h6>
    )
}
