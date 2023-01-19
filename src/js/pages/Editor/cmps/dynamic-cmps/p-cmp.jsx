export function PCmp({ cmp, handleClick, onHover }) {
    let classes = cmp.name + ' '
    if (cmp.class) {
        classes += cmp.class?.join(' ')
    }
    return (
        <p
            className={classes}
            style={cmp.style}
            onClick={e => handleClick(e, cmp)}
            onMouseOver={onHover}
            onMouseOut={ev => ev.currentTarget.classList.remove('hover')}
        >
            {cmp.content.txt}
        </p>
    )
}
