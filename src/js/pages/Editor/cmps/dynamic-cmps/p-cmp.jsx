export function PCmp({ cmp, handleClick }) {
    return (
        <p className={cmp.name} style={cmp.style} onClick={e => handleClick(e, cmp)}>
            {cmp.content.txt}
        </p>
    )
}
