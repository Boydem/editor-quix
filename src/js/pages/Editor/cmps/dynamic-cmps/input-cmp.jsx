export function InputCmp({ cmp, handleClick, onHover }) {
    let classes = cmp.name + ' '
    if (cmp.class) {
        classes += cmp.class?.join(' ')
    }
    return (
        <input
            className={classes}
            style={cmp.style}
            onClick={e => handleClick(e, cmp)}
            placeholder={cmp.content?.placeholder}
            onMouseOver={onHover}
            onMouseOut={ev => ev.currentTarget.classList.remove('hover')}
        ></input>
    )
}
