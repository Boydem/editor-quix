export function ImgCmp({ cmp, handleClick }) {
    return <img src={cmp.content.imgUrl} alt='' className={cmp.name} onClick={e => handleClick(e, cmp)} />
}
