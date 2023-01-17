export function ImgCmp({ cmp }) {
    // console.log(cmp.content)
    console.log(cmp.content.imgUrl)
    return <img src={cmp.content.imgUrl} alt='' className={cmp.name} />
}
