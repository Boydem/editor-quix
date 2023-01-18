export function ACmp({ cmp, handleClick }) {
    let classes = cmp.name + ' '
    if (cmp.class) {
        classes += cmp.class?.join(' ')
    }
    return (
        <a className={classes} style={cmp.style} href={cmp.content.href} onClick={e => handleClick(e, cmp)}>
            {cmp.content.txt}
        </a>
    )
}
