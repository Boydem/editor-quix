export function H1Cmp({ cmp, handleClick }) {
    let classes = cmp.name + ' '
    if (cmp.class) {
        classes += cmp.class?.join(' ')
    }
    return (
        <h1 className={classes} style={cmp.style} onClick={e => handleClick(e, cmp)}>
            {cmp.content.txt}
        </h1>
    )
}
