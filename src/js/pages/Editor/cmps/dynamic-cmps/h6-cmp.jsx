export  function H6Cmp({ cmp,handleClick }) {
    return (
        <h6 className={cmp.name} style={cmp.style} onClick={e => handleClick(e, cmp)}>
            {cmp.content.txt}
        </h6>
    )
}
