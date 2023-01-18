export function InputCmp({ cmp, handleClick }) {
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
        ></input>
    )
}
