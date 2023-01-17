export function H3Cmp({ cmp,handleClick }) {
    return (
        <h3 className={cmp.name} style={cmp.style} onClick={e => handleClick(e, cmp)}>
            {cmp.content.txt}
        </h3>
    )
}
