export default function SpanCmp({ cmp, handleClick }) {
    let classes = cmp.name + ' '
    if (cmp.class) {
        classes += cmp.class?.join(' ')
    }
    return (
        <span className={classes} style={cmp.style} onClick={e => handleClick(e, cmp)}>
            {cmp.content.txt}
        </span>
    )
}
