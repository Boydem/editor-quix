export function ACmp({ cmp, handleClick, onHover }) {
    let classes = cmp.name + ' '
    if (cmp.class) {
        classes += cmp.class?.join(' ')
    }
    return (
        <a
            className={classes}
            style={cmp.style}
            href={cmp.content.href}
            onClick={e => handleClick(e, cmp)}
            onMouseOver={onHover}
            onMouseOut={ev => ev.currentTarget.classList.remove('hover')}
        >
            {cmp.content.txt}
        </a>
    )
}
