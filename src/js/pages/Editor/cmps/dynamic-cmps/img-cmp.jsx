export function ImgCmp({ cmp, handleClick }) {
    let classes = cmp.name + ' '
    if (cmp.class) {
        classes += cmp.class?.join(' ')
    }
    return <img src={cmp.content.imgUrl} alt='' className={classes} onClick={e => handleClick(e, cmp)} />
}
