export function ACmp({ cmp, handleClick }) {
    return (
        <a className={cmp.name} style={cmp.style} href={cmp.content.href} onClick={e => handleClick(e, cmp)}>
            {cmp.content.txt}
        </a>
    )
}
