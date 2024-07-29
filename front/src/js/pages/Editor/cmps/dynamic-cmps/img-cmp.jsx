export function ImgCmp({ cmp, onSelectCmp, onHoverCmp }) {
    let classes = cmp.name + ' '
    if (cmp.class) {
        classes += cmp.class?.join(' ')
    }
    return (
        <img
            src={cmp.content.imgUrl}
            alt=''
            className={classes}
            onClick={e => onSelectCmp(e, cmp)}
            onMouseOver={onHoverCmp}
            onMouseOut={ev => ev.currentTarget.classList.remove('hover')}
            href={cmp.content.href}
        />
    )
}
